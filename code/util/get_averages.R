get_averages <- function(data_to_get_avg, grouping= c("grammatical", "attractor_num", "c_bias")) {
  # avg_clean <- list()
  avg_clean<- data_to_get_avg %>% 
    Rmisc::summarySE(.,
      measurevar = "response_yes",
      groupvars = grouping,
      na.rm = TRUE
    )
  
  # avg_clean$rt <- data_to_get_avg %>%
  #   plyr::ddply(c("experiment"), function(df) {
  #     df %>% se_cousineau(n_conditions = 4, subject, DV = RT, 
  #                         group = grouping, 
  #                         is_proportion = FALSE)
  #   })
  
  # avg_clean$rt_correct <- data_to_get_avg %>% subset(ResponseCorrect) %>%
  #   plyr::ddply(c("experiment"), function(df) {
  #     df %>% se_cousineau(n_conditions = 4, subject, DV = RT, 
  #                         group = grouping, 
  #                         is_proportion = FALSE)
  #   })
  
  avg_clean
}