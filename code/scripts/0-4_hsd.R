hsd1 = read.csv('data/raw/HammerlyEtAl2019/experiment1-all.csv') %>% 
  mutate(subj = sprintf("S[%d]", subj + 400), exp = "1")
hsd3 = read.csv('data/raw/HammerlyEtAl2019/experiment3-all.csv') %>%
  mutate(subj = sprintf("S[%d]", subj + 500), exp = "3")
data$hsd = bind_rows(hsd1, hsd3) %>% filter(response != "NULL")

data$hsd %<>% select(
  subject=subj,
  experiment=stimulustype,
  item, 
  exp_condition=condition, sentence, response, 
  RT=rt, 
  trial_no=order, 
  CorrectResponse, 
  grammatical=Grammaticality, 
  attractor_num=Attractor, 
  ResponseCorrect=Accuracy, 
  manipulation=exp
) %>% mutate(
  RT = RT*1000,
  verb_num = case_when(
    experiment == "Exp" & grammatical == "Ungrammatical" ~ "pl",
    experiment == "Exp" & grammatical != "Ungrammatical" ~ "sg",
    TRUE ~ "NA"
  ),
  manipulation = case_when(
    manipulation == 1 ~ "No",
    manipulation == 3 ~ "Ungram"
  ),
  experiment = case_when(
    experiment == "Exp" ~ "AgrAttr",
    experiment != "Exp" ~ "filler"
  ),
  condition = case_when(
    exp_condition == 4 ~ "a", 
    exp_condition == 2 ~ "b",
    exp_condition == 3 ~ "c",
    exp_condition == 1 ~ "d",
    exp_condition == 0 & grammatical == "Grammatical" ~ "filler_g",
    exp_condition == 0 & grammatical != "Grammatical" ~ "filler_ung"
  ),
  exp_condition = case_when(
    exp_condition == 4 ~ "condition_a", 
    exp_condition == 2 ~ "condition_b",
    exp_condition == 3 ~ "condition_c",
    exp_condition == 1 ~ "condition_d",
    exp_condition == 0 & grammatical == "Grammatical" ~ "filler_g",
    exp_condition == 0 & grammatical != "Grammatical" ~ "filler_ung"
  ),
  match = case_when(
    attractor_num == "Plural" ~ "mismatch",
    attractor_num == "Singular" ~ "match",
    TRUE ~ "NA"
  ),
  response_yes = case_when(
    response == "f" ~ TRUE,
    response != "f" ~ FALSE,
    TRUE ~ NA
  ),
  ResponseCorrect = case_when(
    ResponseCorrect == 1 ~ TRUE,
    TRUE ~ FALSE
  ),
  grammatical = case_when(
    grammatical == "Grammatical" ~ "gram",
    grammatical == "Ungrammatical" ~ "ungram",
    TRUE ~ "NA"
  ),
  attractor_num = case_when(
    attractor_num == "Plural" ~ "pl",
    attractor_num == "Singular" ~ "sg",
    TRUE ~ "NA"
  )
)
