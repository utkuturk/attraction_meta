get_bias <- function(df, control=TRUE, threeway = TRUE, lower_bias=-0.1, upper_bias=0.1) {
  if (control) {
    # bias = df %>% subset(!is.na(response_yes) & experiment != "filler")
    bias = df %>% select(item, RT, subject, response_yes, grammatical, attractor_num, ResponseCorrect)
    # make hsd gram ungram
    bias %<>% group_by(subject, attractor_num, grammatical) %>%
      mutate(correct = sum(ResponseCorrect) +.5 ) %>% 
      mutate(numItem = n_distinct(item)+1) %>%  
      mutate(mean = correct/numItem) %>% 
      mutate(ang = paste(attractor_num, grammatical, sep="_")) %>%
      group_by(subject, ang) %>%
      summarise(average = mean(mean)) %>%
      tidyr::spread(ang, average) %>%
      # which one is def ungram
      # which one is def gram
      mutate(FA = 1 - sg_ungram, hit = sg_gram) %>%  
      group_by(subject) %>%
      summarise(bias = -.5*(qnorm(hit)+qnorm(FA)))
    df %<>% left_join(., bias, by = 'subject')
    if (threeway) {
      df %<>% mutate(c_bias = case_when(
        bias < lower_bias ~ "neg",  bias > upper_bias ~ "pos", TRUE ~ "0"
      ))
    } 
    if (!threeway) {
      df %<>% mutate(c_bias = ifelse(bias < 0, "negative", "positive"))
    }
    df
  } else {
    bias = df %>% subset(!is.na(response_yes) & experiment == "filler")
    bias %<>% select(item, RT, subject, response_yes, grammatical, ResponseCorrect)
    # make hsd gram ungram
    bias %<>% group_by(subject, grammatical) %>%
      mutate(correct = sum(ResponseCorrect) +.5 ) %>% 
      mutate(numItem = n_distinct(item)+1) %>%  
      mutate(mean = correct/numItem) %>% 
      group_by(subject, grammatical) %>%
      summarise(average = mean(mean)) %>%
      tidyr::spread(grammatical, average) %>%
      mutate(FA = 1 - ungram, hit = gram) %>%  
      group_by(subject) %>%
      summarise(bias = -.5*(qnorm(hit)+qnorm(FA)))
    df %<>% left_join(., bias, by = 'subject')
    if (threeway) {
      df %<>% mutate(c_bias = case_when(
        bias < lower_bias ~ "neg",  bias > upper_bias ~ "pos", TRUE ~ "0"
      ))
    } 
    if (!threeway) {
      df %<>% mutate(c_bias = ifelse(bias < 0, "negative", "positive"))
    }
    df
  }
}

