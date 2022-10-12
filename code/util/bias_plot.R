bias_plot <- function(df) {
  df %>%
    ggplot(aes(bias, M, 
               color = attractor_num, 
               group = attractor_num)) + 
    geom_point() + geom_line() + 
    facet_wrap(~grammatical, 
               labeller = labeller(grammatical = exp3.gram.label),
               scales = "free_y") + 
    geom_errorbar(aes(ymin = M - 1.96*SE, 
                      ymax = M + 1.96*SE), 
                  width = 0.1) + 
    xlab("Experiment") + 
    ylab("Percentage 'acceptable'") + 
    scale_y_continuous(labels=scales::percent) + 
    scale_x_discrete(name = "Bias", 
                     labels = c("Towards\nGrammaticality", "Towards\nUngrammaticality")) +
    scale_color_lancet(name = "Attractor Number", 
                       labels = c("Plural", "Singular")) + 
    theme_classic() +
    theme(text=element_text(size=16, family="Helvetica Neue"))+
    theme(strip.background = element_blank()) + 
    theme(legend.position = 'bottom')
}

  
