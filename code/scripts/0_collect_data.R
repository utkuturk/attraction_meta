set.seed(01110011)

library(magrittr)
library(dplyr)
library(gdata)

invisible(lapply(list.files("code/util/", full.names = T), source))

data = list()

# Turk Logacev Experiment 1 Data ------
data$tl1 <- read_ibex_results("data/raw/no_syncretism/results/results")


data$tl1 %<>% mutate(exp_condition = case_when(
  exp_condition == "filler" & item_num <= 120 ~ "filler_g",
  exp_condition == "filler" & item_num >= 121 ~ "filler_ung",
  exp_condition == "practice" ~ "practice",
  exp_condition == "condition_b" ~ "condition_b",
  exp_condition == "condition_a" ~ "condition_a",
  exp_condition == "condition_c" ~ "condition_c",
  exp_condition == "condition_d" ~ "condition_d"
))


tl1.conditions <- data.frame(
  exp_condition = c("practice", "condition_a", "condition_b", "condition_c", "condition_d", "filler_ung", "filler_g"),
  experiment =    c("practice", "AgrAttr",     "AgrAttr",     "AgrAttr",     "AgrAttr",     "filler",     "filler"),
  condition =     c("practice", "a",           "b",           "c",           "d",           "filler_ung", "filler_g"),
  grammatical =   c("practice", "ungram",      "gram",        "ungram",      "gram",        "ungram",     "gram"),
  verb_num =      c("practice", "pl",          "sg",          "pl",          "sg",          "sg",         "pl"),
  attractor_num = c("practice", "pl",          "pl",          "sg",          "sg",          'filler',     'filler'),
  match =         c("practice", "mismatch",    "mismatch",    "match",       "match",       'filler',     'filler'),
  stringsAsFactors = T
)


data$tl1 %<>% left_join(tl1.conditions, by = "exp_condition")
data$tl1 %<>% mutate(ResponseCorrect = (response_yes == (grammatical == "gram")))


# Turk Logacev Experiment 2 Data ---------
data$tl2 <- read_ibex_results("data/raw/form_matching/results/results", subj_offset = 100, item_offset = 100)


data$tl2 %<>% mutate(exp_condition = case_when(
  exp_condition == "filler" & item_num <= 120 ~ "filler_ung",
  exp_condition == "filler" & item_num >= 121 ~ "filler_g",
  exp_condition == "practice" ~ "practice",
  exp_condition == "condition_b" ~ "condition_b",
  exp_condition == "condition_a" ~ "condition_a",
  exp_condition == "condition_c" ~ "condition_c",
  exp_condition == "condition_d" ~ "condition_d"
))


tl2.conditions <- data.frame(
  exp_condition = c("practice", "condition_a", "condition_b", "condition_c", "condition_d", "filler_ung", "filler_g"),
  experiment =    c("practice", "AgrAttr",     "AgrAttr",     "AgrAttr",     "AgrAttr",     "filler",     "filler"),
  condition =     c("practice", "a",           "b",           "c",           "d",           "filler_ung", "filler_g"),
  grammatical =   c("practice", "ungram",      "gram",        "ungram",      "gram",        "ungram",     "gram"),
  verb_num =      c("practice", "pl",          "sg",          "pl",          "sg",          "sg",         "pl"),
  attractor_num = c("practice", "pl",          "pl",          "sg",          "sg",          'filler',     'filler'),
  match =         c("practice", "mismatch",    "mismatch",    "match",       "match",       'filler',     'filler'),
  stringsAsFactors = T
)

data$tl2 %<>% left_join(tl2.conditions, by = "exp_condition")
data$tl2 %<>% mutate(ResponseCorrect = (response_yes == (grammatical == "gram")))


# Turk Logacev Experiment 3 Data -------
tl_bias_gram <- read_ibex_results("data/raw/hsd_replication_gram/results/results", subj_offset = 200, item_offset = 200) %>% mutate(manipulation = "Gram")
tl_bias_ungram <- read_ibex_results("data/raw/hsd_replication_gram/results/results", subj_offset = 300, item_offset = 300) %>% mutate(manipulation = "Ungram")
data$tl3 <- bind_rows(tl_bias_gram, tl_bias_ungram)



tl3.conditions <- data.frame(
  exp_condition = c("practice", "condition_a", "condition_b", "condition_c", "condition_d", "filler_ung", "filler_g"),
  experiment =    c("practice", "AgrAttr",     "AgrAttr",     "AgrAttr",     "AgrAttr",     "filler",     "filler"),
  condition =     c("practice", "a",           "b",           "c",           "d",           "filler_ung", "filler_g"),
  grammatical =   c("practice", "ungram",      "gram",        "ungram",      "gram",        "ungram",     "gram"),
  verb_num =      c("practice", "pl",          "sg",          "pl",          "sg",          "sg",         "pl"),
  attractor_num = c("practice", "pl",          "pl",          "sg",          "sg",          'filler',     'filler'),
  match =         c("practice", "mismatch",    "mismatch",    "match",       "match",       'filler',     'filler'),
  stringsAsFactors = T
)

data$tl3 %<>% left_join(tl3.conditions, by = "exp_condition")
data$tl3 %<>% mutate(ResponseCorrect = (response_yes == (grammatical == "gram")))

# Hammerly, Staub, Dillon 2019 Data ----------
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
  )
)


# Lago --------
data$lago = read_lago("data/raw/lagoetal/Lago_data.csv", subj_offset = 600)
data$lago %<>% mutate(ResponseCorrect = (response_yes == (grammatical == "gram")))

# Add more ---------


# output -----------
saveRDS(data, file = "data/data.rds")
