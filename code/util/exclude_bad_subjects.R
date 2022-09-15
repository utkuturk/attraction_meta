exclude_bad_subjects <- function(data_to_clean, accuracy_threshold = 0.25, rt_below = 200, rt_upper = 4999) {
  avg_by_subj <- data_to_clean %>%
    group_by(subject, experiment, condition, 
             grammatical, verb_num, attractor_num) %>%
    summarize(avRT = mean(RT), 
              p_yes = mean(response_yes, na.rm = T), 
              N = sum(!is.na(response_yes))  )
  
  avg_by_subj_wide <- avg_by_subj %>% 
    mutate(expcond = paste(experiment, condition, sep="_")) %>% 
    ungroup() %>%
    dplyr::select(-experiment, -condition, -avRT, -N,
                  -grammatical, -verb_num, -attractor_num) %>%
    tidyr::spread(expcond, p_yes) %>% 
    mutate(delta_dc = AgrAttr_d - AgrAttr_c)
  
  bad_subjects <- subset(avg_by_subj_wide, delta_dc <= accuracy_threshold ) %>% .$subject
  data_clean <- data_to_clean %>% subset(!subject %in% bad_subjects)
  
  data_clean %<>% filter(RT < rt_upper & rt_below< RT)
  if("natturk" %in% colnames(data_clean)){
    data_clean %<>% subset(natturk == "nat_turk")
  }
  
  print( with(data_clean, table(exp_condition, response_yes)) )
  print( sprintf("number of bad subjects: %f", length(bad_subjects)))
  data_clean
  
}