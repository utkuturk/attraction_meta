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

