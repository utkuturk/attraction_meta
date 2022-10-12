model_summary <- function(m, include_pp_below_zero = T)
{
  tbl <- fixef(m)[-1,-2] %>% as.data.frame()
  tbl$coef <- rownames(tbl)
  
  if (include_pp_below_zero) {
    cnames <- paste("b", tbl$coef, sep = "_")
    samples <- brms::posterior_samples(m, pars = cnames)
    stopifnot(ncol(samples) == length(cnames))
    
    pref_coef_stats_df <- function(df, name) {
      df %>% as.data.frame(colnames = "x") %T>% 
        { colnames(.) <- name } %T>%
        { .$coef <- rownames(.) %>% gsub("^b_", "", .) }
    }
    
    p_below_zero <- samples %>% sapply(function(x) mean(x < 0)) %>% 
      pref_coef_stats_df("PBelowZero")
    tbl %<>% left_join(p_below_zero, by = "coef")
    
    p_below_zero_str <- samples %>% sapply(function(x) mean(x < 0) %>% prob_str()) %>% 
      pref_coef_stats_df("PBelowZeroStr")
    tbl %<>% left_join(p_below_zero_str, by = "coef")
    
    p_above_zero <- samples %>% sapply(function(x) mean(x > 0)) %>% 
      pref_coef_stats_df("PAboveZero")
    tbl %<>% left_join(p_above_zero, by = "coef")
    
    p_above_zero_str <- samples %>% sapply(function(x) mean(x > 0) %>% prob_str()) %>% 
      pref_coef_stats_df("PAboveZeroStr")
    tbl %<>% left_join(p_above_zero_str, by = "coef")
    
  }
  
  rownames(tbl) <- tbl$coef
  tbl
}