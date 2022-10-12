plot_avgs <- function(df, threeway=T, nobias=F) {
  if (threeway) {
    labelling = c("Gram.", "Neuter", "Ungram.")
  } else {
    labelling = c("Biased", "Unbiased")
  }
  if (nobias) {
    plot = df %>%
      ggplot(aes(attractor_num, response_yes, 
                 color = attractor_num, 
                 group = attractor_num)) + 
      geom_point() + geom_line() + 
      facet_wrap(~grammatical, 
                 labeller = labeller(grammatical = c(
                   gram = "Grammatical\n(Singular Verb)", 
                   ungram = "Ungrammatical\n(Plural Verb)")
                 ),
                 scales = "free_y") + 
      geom_errorbar(aes(ymin = response_yes - ci, 
                        ymax = response_yes + ci), 
                    width = 0.1) + 
      xlab("") + 
      ylab("Percentage 'acceptable'") + 
      scale_y_continuous(labels=scales::percent) + 
      scale_x_discrete(name = "Attractor Number", 
                       labels = c("Plural", "Singular")
      )  +
      scale_color_lancet(name = "Attractor Number", 
                         labels = c("Plural", "Singular")) + 
      theme_classic() +
      theme(text=element_text(size=16, family="Helvetica Neue"))+
      theme(strip.background = element_blank()) + 
      theme(legend.position = 'none')
  } else {
    plot = df %>%
      ggplot(aes(c_bias, response_yes, 
                 color = attractor_num, 
                 group = attractor_num)) + 
      geom_point() + geom_line() + 
      facet_wrap(~grammatical, 
                 labeller = labeller(grammatical = c(
                   gram = "Grammatical\n(Singular Verb)", 
                   ungram = "Ungrammatical\n(Plural Verb)")
                 ),
                 scales = "free_y") + 
      geom_errorbar(aes(ymin = response_yes - ci, 
                        ymax = response_yes + ci), 
                    width = 0.1) + 
      xlab("") + 
      ylab("Percentage 'acceptable'") + 
      scale_y_continuous(labels=scales::percent) + 
      scale_x_discrete(name = "Bias", 
                       labels = c("Towards\nGrammaticality", "Towards\nUngrammaticality")
      )  +
      scale_color_lancet(name = "Attractor Number", 
                         labels = c("Plural", "Singular")) + 
      theme_classic() +
      theme(text=element_text(size=16, family="Helvetica Neue"))+
      theme(strip.background = element_blank()) + 
      theme(legend.position = 'bottom')
  }
  
  plot
}