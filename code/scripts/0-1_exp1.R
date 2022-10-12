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
