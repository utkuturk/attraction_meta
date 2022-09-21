# TODO: Figure out how to treat missing data in this function
# TODO: Make sure this is strictly a within-participants design. Strange things happen to the means if one tries to process two experiments at once, even if the experiment is used as a grouping factor in the group argument
se_cousineau <- function(df, n_conditions, subject, DV, group, is_proportion = NULL)
{
  stopifnot(!"avgDV" %in% colnames(df))
  subject_var <- substitute(subject) %>% deparse()
  DV <- substitute(DV) %>% deparse()
  
  subj_means <- df %>% group_by(.dots = subject_var) %>% dplyr::summarize(avgDV := mean(!!as.name(DV), na.rm = T))
  GM <- mean(subj_means$avgDV)
  df %<>% group_by(.dots = subject_var) %>% dplyr::mutate(nDV = !!as.name(DV) - mean(!!as.name(DV), na.rm = T) + GM )
  
  if (is.null(is_proportion)) {
    dv <- df[[DV]]
    dv_unique <- unique(dv)
    if ( is.logical(dv) || (length(dv_unique) == 2 && all(dv_unique %in% c(0,1))) ) {
      is_proportion <- TRUE
    } else {
      is_proportion <- FALSE
    }
  }
  
  var_correction_factor <- n_conditions/(n_conditions-1)
  df %>% group_by(.dots = group) %>% 
    dplyr::summarize(M = mean(nDV, na.rm = T),
                     Var = ifelse(is_proportion, M*(1-M), var(nDV, na.rm = T)) * var_correction_factor,
                     #Var = var(nDV, na.rm = T) * var_correction_factor,
                     N = sum(!is.na(nDV)),
                     SE = sqrt(Var/N) )
}