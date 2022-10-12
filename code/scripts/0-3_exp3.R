tl_bias_gram <- read_ibex_results("data/raw/hsd_replication_gram/results/results", 
                                  subj_offset = 200, 
                                  item_offset = 200) %>% mutate(manipulation = "Gram")
tl_bias_ungram <- read_ibex_results("data/raw/hsd_replication_ungram/results/results", 
                                    subj_offset = 300, 
                                    item_offset = 300) %>% mutate(manipulation = "Ungram")
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