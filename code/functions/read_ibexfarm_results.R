read_ibexfarm_results <- function(fname, subj_offset = 0)
{
  data <- read.csv(fname, 
                   header = F, 
                   comment.char = "#", 
                   encoding = "UTF-8" , 
                   col.names = paste0("V",seq_len(11)), 
                   fill = TRUE, 
                   stringsAsFactors = FALSE)
  colnames(data) = c("Time", "MD5", "ControllerType", "SentenceNoInStimFile", "Element", "exp_condition", "item", "Sentence", "Question","Answer", "RT")
  
  subject_id <- with(data, { as.integer(as.factor(paste(Time, MD5))) })
  data$subject <- sprintf("S[%d]", subject_id + subj_offset)
  
  df_forms <- data %>% subset(ControllerType != "DashedAcceptabilityJudgment" ) %>% gdata::drop.levels()
  data %<>% subset(ControllerType == "DashedAcceptabilityJudgment")
  
  age <- df_forms %>% dplyr::filter(Sentence == "age") %>% 
    dplyr::select(subject, age = Question)
  natturk <- df_forms %>% dplyr::filter(Sentence == "natturk") %>% 
    dplyr::select(subject, natturk = Question) %T>% 
    { .$natturk %<>% recode(male ="nat_turk", female = "nat_non_turk") } 
  forms <- dplyr::left_join(age, natturk, by = "subject")
  
  stopifnot( nrow(data) %% 2 == 0 )
  rows_stim <- data[c(T,F),]
  rows_resp <- data[c(F,T),]
  stopifnot( all(is.na( rows_stim$RT )) )
  
  data <- rows_resp %>% left_join(forms) %>% 
    dplyr::select(-MD5, -Time, -ControllerType, -Sentence, -Element) %>%
    dplyr::rename(ResponseCorrect=Answer, Response=Question) %>%
    dplyr::select(-ResponseCorrect)
  data %<>% group_by(subject) %>% mutate(trial_no = seq(subject))
  data %<>% mutate( late_response = (Response == "NULL"), Response = ifelse(late_response, NA, as.character(Response)) )
  
  responses <- c(yes="İYİ (P'ye basınız)", no="KÖTÜ (Q'ya basınız)")
  data$Response %<>% as.character() %>% enc2native()
  stopifnot( all(data$Response %in% responses | is.na(data$Response) ) )
  
  data$response_yes <- ifelse(grepl("P'ye",data$Response) , T, 
                              ifelse(grepl("Q'ya",data$Response) , F, NA))
  print( with(data, table(Response, response_yes)) )
  data %<>% dplyr::select(-Response)
  
  data
}
