read_lago <- function(fname, subj_offset) {
  data = read.csv(fname, encoding = "UTF-8", as.is = T) %>% 
    subset(Group == "monolingual") %>% 
    select(-Accuracy, -L1:-Group, -List:-SelfRateGerman)
  
  with(data, stopifnot( is.na(Grammatical) == (Experiment == "offline") ))
  
  unp = data %>% 
    subset(is.na(Grammatical)) %>%
    select(-Grammatical:-Label)
  
  data = data %>% 
    subset(!is.na(Grammatical)) %>%
    select(-Distance:-NewCond) %>% 
    mutate(response_yes = (Response == "yes") ) %>% 
    select(-Response) %>% ungroup() %>%
    select(
      grammatical=Grammatical,
      attractor_num=Attractor,
      experiment=Experiment,
      lagoetal_condition=Condition, 
      ID=Participant, 
      item=Item,
      response_yes,
      RT
    )
  
  data %<>% 
    transform(., subject = sprintf("S[%d]", as.numeric(factor(ID)) + subj_offset) ) %>%
    select(-ID)
  
  data %<>% group_by(subject) %>% mutate(trial_no = seq(subject))
  
  
  # map to our condition labels
  mapping <- data.frame(
    condition = c("a", "b", "c", "d"),
    lagoetal_condition = c("d", "b", "c", "a"), 
    stringsAsFactors = F
  )
  data %<>% left_join( mapping, by = "lagoetal_condition" )
  data %<>% mutate(
    verb_num = case_when(
      grammatical == "ungrammatical" ~ "pl",
      grammatical == "gramatical" ~ "sg"
    ),
    experiment = case_when(
      experiment == "online" ~ "AgrAttr"
    ),
    exp_condition = case_when(
      condition == "a" ~ "condition_a",
      condition == "b" ~ "condition_b",
      condition == "c" ~ "condition_c",
      condition == "d" ~ "condition_d"
    ),
    match = case_when(
      attractor_num == "plural" ~ "mismatch",
      attractor_num == "singular" ~ "match",
    )
  )
}








