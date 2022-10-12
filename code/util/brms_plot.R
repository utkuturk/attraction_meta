brms_plot <- function(m, 
                                    sumtable = FALSE,
                                    interaction_panels = c(), 
                                    strip_label_max_characters = NULL, 
                                    map_names = NULL,
                                    exclude_names = NULL,
                                    plot_stats = FALSE, 
                                    expand_right = 1, 
                                    expand_top = 1,
                                    x_stat_adjust = 0,
                                    x_breaks = ggplot2::waiver(),
                                    x_minor_breaks = ggplot2::waiver())
{
  interaction_symbol <- " * "
  use_interaction_panels <- length(interaction_panels) > 0
  
  if (sumtable) {
    tbl <- m
  } else if ( "brmsfit" %in% class(m) ) {
    tbl <- model_summary( m #, include_pp_below_zero = plot_stats 
    )
    
  } else if (is.list(m)) {
    stopifnot( length(names(m)) == length(unique(names(m))) )
    
    tbl <- plyr::ldply(seq_along(m), function(i) { 
      tbl <- model_summary( m[[i]] #, include_pp_below_zero = plot_stats 
      )
      tbl$model <- names(m)[i]
      tbl
    })
    tbl$model %<>% factor( levels = names(m) )
    tbl
    
  } else {
    stop("Unknown model format.")
  }
  tbl %<>% subset(!coef %in% exclude_names)
  
  # rename some rows 
  if (length(map_names) > 0) {
    for (i in seq_along(map_names)) {
      idx <- which(tbl$coef == names(map_names)[i])
      if (length(idx) > 0) {
        if (map_names[i] == "") {
          tbl <- tbl[-idx,]
        } else {
          tbl$coef[idx] <- map_names[i]
        }
      }
    }
  }
  
  if (use_interaction_panels) {
    tbl$interaction <- ""
  }
  for (cur_interaction in interaction_panels) {
    cur_interaction_term1 <- paste0(cur_interaction,":")
    cur_interaction_term2 <- paste0(":",cur_interaction)
    
    is_target_interaction <- grepl(cur_interaction_term1, tbl$coef) | grepl(cur_interaction_term2, tbl$coef)
    
    tbl$coef[is_target_interaction] %<>% gsub(cur_interaction_term1, "", .) %>% 
      gsub(cur_interaction_term2, "", .)
    
    tbl$interaction[is_target_interaction] <- paste0(cur_interaction, interaction_symbol, "...")
  }
  
  # replace interaction symbol if necessary
  if (interaction_symbol != ":") {
    tbl$coef %<>% gsub("([^ ]):([^ ])", paste0("\\1", interaction_symbol, "\\2"), .)
    
    if (use_interaction_panels)
      tbl$interaction %<>% gsub("([^ ]):([^ ])", paste0("\\1", interaction_symbol, "\\2"), .)
  }
  coefs_order <- c(rev(map_names), rev(tbl$coef)) %>% unique() # %>% rev()
  tbl$coef %<>% factor(levels = coefs_order)
  #tbl$coef %<>% factor(levels = tbl$coef %>% unique %>% rev())
  
  # plot
  if (sumtable) {
    p <- ggplot(tbl, aes(Estimate, rowname)) + 
      geom_errorbarh(aes(xmin = Q2.5, xmax = Q97.5), height=0, size=0.8) + 
      geom_point(shape=21, fill="white", color="black", size=3) +
      geom_vline(xintercept = 0, color = "grey")
  } else {
    p <- ggplot(tbl, aes(Estimate, coef)) + 
      geom_errorbarh(aes(xmin = Q2.5, xmax = Q97.5), height=0, size=0.8) + 
      geom_point(shape=21, fill="white", color="black", size=3) +
      geom_vline(xintercept = 0, color = "grey")
  }
  
  
  if (plot_stats)
  {
    tbl$xmax <- with(tbl, max(c(Estimate, Q2.5, Q97.5))) + x_stat_adjust
    
    
    p <- p + scale_y_discrete(expand = expand_scale(mult = c(.05, .15*expand_top), 
                                                    add = c(0, 0))
    )
    p <- p + scale_x_continuous(expand = expand_scale(mult = c(.05, .15*expand_right), 
                                                      add = c(0, 0)),
                                breaks = x_breaks, 
                                minor_breaks = x_minor_breaks)
    if (sumtable) {
      p <- p + geom_text(aes(x = tbl$xmax, y = tbl$rowname,#_idx, 
                             label = sprintf("[%s]", tbl$PBelowZeroStr)), 
                         family = "mono", hjust = "left")
      
      suppressWarnings({
        label <- parse(text = "underline(paste('P(', beta, ' < 0)'))")
        p <-  p + geom_text(x = tbl$xmax[1], y = length(unique(tbl$rowname))+1, 
                            label = label,
                            family = "mono", hjust = "left")#, fontface = "underlined")
      })
    } else {
      p <- p + geom_text(aes(x = tbl$xmax, y = tbl$coef,#_idx, 
                             label = sprintf("[%s]", tbl$PBelowZeroStr)), 
                         family = "mono", hjust = "left")
      
      suppressWarnings({
        label <- parse(text = "underline(paste('P(', beta, ' < 0)'))")
        p <-  p + geom_text(x = tbl$xmax[1], y = length(unique(tbl$coef))+1, 
                            label = label,
                            family = "mono", hjust = "left")#, fontface = "underlined")
      })
    }
    
    
  }
  
  if (use_interaction_panels) {
    p <- p + facet_wrap(~ interaction, strip.position = "left", ncol = 1, scales = "free_y")
    if (!is.null(strip_label_max_characters))
      p <- p + label_wrap_gen(width = strip_label_max_characters)
  }
  
  if ( !is.null(tbl$model) ) {
    p <- p + facet_wrap(~model)
  }
  
  p <- p + theme_bw(base_family = "Helvetica Neue")  + 
    theme(panel.border = element_blank(), 
          axis.ticks.y = element_blank(),
          #strip.text.x = element_blank(),
          panel.grid.major = element_blank(),
          panel.grid.minor = element_blank(),
          strip.placement = "outside") +
    ylab("")
  
  return (p)
}