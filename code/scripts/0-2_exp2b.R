
data$tl2b <- read_ibex_results("data/raw/form_matching_8cond/results/results", subj_offset = 700, item_offset = 700) 


data$tl2b %<>% mutate(exp_condition = case_when(
  exp_condition == "filler" & item_num <= 120 ~ "filler_ung",
  exp_condition == "filler" & item_num >= 121 ~ "filler_g",
  exp_condition == "practice" ~ "practice",
  exp_condition == "condition_gen_b" ~ "condition_gen_b",
  exp_condition == "condition_gen_a" ~ "condition_gen_a",
  exp_condition == "condition_gen_c" ~ "condition_gen_c",
  exp_condition == "condition_gen_d" ~ "condition_gen_d",
  exp_condition == "condition_rc_b" ~ "condition_rc_b",
  exp_condition == "condition_rc_a" ~ "condition_rc_a",
  exp_condition == "condition_rc_c" ~ "condition_rc_c",
  exp_condition == "condition_rc_d" ~ "condition_rc_d"
))


tl2b.conditions <- data.frame(
  exp_condition = c("practice", "condition_gen_a", "condition_gen_b", "condition_gen_c", "condition_gen_d", "condition_rc_a", "condition_rc_b", "condition_rc_c", "condition_rc_d", "filler_ung", "filler_g"),
  experiment =    c("practice", "AgrAttr", "AgrAttr", "AgrAttr", "AgrAttr", "AgrAttr", "AgrAttr", "AgrAttr", "AgrAttr", "filler", "filler"),
  condition =     c("practice", "gen_a", "gen_b", "gen_c", "gen_d", "rc_a", "rc_b", "rc_c", "rc_d", "filler_ung", "filler_g"),
  grammatical =   c("practice", "ungram", "gram", "ungram", "gram", "ungram", "gram", "ungram", "gram", "ungram","gram"),
  verb_num =      c("practice", "pl", "sg", "pl", "sg", "pl", "sg", "pl", "sg", "sg", "pl"),
  attractor_num = c("practice", "pl", "pl", "sg", "sg", "pl", "pl", "sg", "sg", 'filler', 'filler'),
  match =         c("practice", "mismatch", "mismatch", "match", "match", "mismatch", "mismatch", "match", "match", 'filler', 'filler'),
  att_type =      c("practice", rep("gen", 4), rep("rc",4), "filler", "filler"),
  stringsAsFactors = T
)

data$tl2b  %<>% left_join(tl2b.conditions, by = "exp_condition")

temp_filler = data$tl2b %>% subset(att_type == "filler" ) 
data$tl2b %<>% subset(att_type == "gen" )

data$tl2b$temp_cond = data$tl2b$condition
data$tl2b %<>% tidyr::separate(temp_cond, c("temp_type","condition"), "_") %>% select( -temp_type)
data$tl2b %<>% bind_rows(., temp_filler); rm(temp_filler)
data$tl2b %<>% mutate(ResponseCorrect = (response_yes == (grammatical == "gram")))
