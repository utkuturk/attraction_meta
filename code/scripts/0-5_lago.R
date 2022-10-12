data$lago = read_lago("data/raw/lagoetal/Lago_data.csv", subj_offset = 600)
data$lago %<>% 
  mutate(ResponseCorrect = (response_yes == (grammatical == "grammatical"))) %>% 
  mutate(
    attractor_num = case_when(
      attractor_num == "plural" ~ "pl",
      attractor_num == "singular" ~ "sg",
      TRUE ~ "NA"
    ),
    grammatical = case_when(
      grammatical == "grammatical" ~ "gram",
      grammatical == "ungrammatical" ~ "ungram",
      TRUE ~ "NA"
    )
  )
