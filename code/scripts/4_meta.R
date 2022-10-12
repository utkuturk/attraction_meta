set.seed(01110011)
fname_data = "data/data.rds"
fname_p = "data/p_avg.RData"
fname_pm = "data/model_plots.RData"
fname_m = "data/models.RData"
library(gdata)
library(magrittr)
library(purrr)
library(dplyr)
library(ggplot2)
library(ggsci)
library(brms)
select = dplyr::select
invisible(lapply(list.files("code/util/", full.names = T), source))
data = readRDS(fname_data)
p = readRDS(fname_p)
pm = readRDS(fname_pm)
m = readRDS(fname_m)


# Contrast Coding

code_contrasts <- function(df) {
  df %<>% within(., {
    c_ung <- ifelse(grammatical == "ungram", .5, -.5)
    c_mis <- ifelse(attractor_num == "pl", .5, -.5)
    l_trial <- log(trial_no)
  })
}

data %<>% map(code_contrasts)

# Select Model
create_model_df <- function(df) {
  df %<>% filter(grammatical == "gram") %>%
    filter(experiment != "filler") %>% 
    select(subject, item, trial_no, response_yes, 
           bias, c_mis, c_ung, l_trial) %>% 
    mutate(subject = as.factor(subject), item = as.factor(item)) %>%
    mutate(exp = ifelse(df$subject[1]=="S[1]", "tl1", 
                        ifelse(df$subject[1]=="S[101]", "tl2", 
                               ifelse(df$subject[1]=="S[701]", "tl2b", 
                                      ifelse(df$subject[1]=="S[201]", "tl3", 
                                             ifelse(df$subject[1]=="S[429]", "hsd", 
                                                    ifelse(df$subject[1]=="S[601]", "lago", 0)))))))
}


model_data = data %>% map(create_model_df) 
model_data_coercible = bind_rows(model_data$tl1, model_data$tl2b, model_data$tl3, model_data$hsd, model_data$lago)


m$meta = brm(
  formula = bf(response_yes ~ bias * c_mis + l_trial +
                 (bias * c_mis + 1 | subject) +
                 (c_mis + l_trial + 1 | item) +
                 (bias * c_mis + 1 | exp)),
  data = model_data_coercible,
  family = bernoulli("probit"), 
  prior = c(
    set_prior("normal(0,1)", class = "Intercept"),
    set_prior("normal(0,1)", class = "b"),
    set_prior("normal(0,1)", class = "sd"),
    set_prior("lkj(2)", class = "cor")
  ),
  chains = 4, cores = 4,
  warmup = 2000,iter = 8000,
  control = list(adapt_delta = 0.9),
  backend="cmdstanr", 
  stan_model_args=list(stanc_options = list("O1")), 
  file = "data/models/meta"
)

pm$meta = brms_plot(
  m_meta, exclude_names = "l_trial",
  plot_stats = T, map_names = mycoefs,
  expand_right = 1, expand_top = 4,
  x_stat_adjust = 0.4, x_breaks = seq(-1.5, 2.5, 0.5)
) + annotate(
  x = -1.5, xend = 2.5, y = 0, yend = 0, 
  lwd = 0.25, geom = "segment"
) + xlab("Estimate (probit)")

saveRDS(pm, "data/model_plots.RData")

# Interaction-plot

summaries = map(m, model_summary) %>%
  map(rownames_to_column) %>%
  map(filter, rowname=="bias:c_mis")
summaries$tl1$rowname = "Turk & Logacev (Exp1)"
summaries$tl2b$rowname = "Turk & Logacev (Exp2)"
summaries$tl3$rowname = "Turk & Logacev (Exp3)"
summaries$hsd$rowname = "Hammerly et al. (2019)"
summaries$lago$rowname = "Lago et al. (2019)"
summaries$meta$rowname = "Mean"


summaries = bind_rows(
  summaries$tl1, summaries$tl2b, summaries$tl3, 
  summaries$hsd, summaries$lago, summaries$meta
)
summaries$rowname <- factor(summaries$rowname, levels=c(
  "Mean", "Turk & Logacev (Exp2)",  "Turk & Logacev (Exp1)", 
  "Lago et al. (2019)", "Hammerly et al. (2019)", "Turk & Logacev (Exp3)"
  ))

pm$interactions = brms_plot(
  summaries, sumtable = TRUE, 
  plot_stats = T, 
  expand_right = 1, expand_top = 2,
  x_stat_adjust = 0.4, x_breaks = seq(-1.5, 2.5, 0.5)
) + annotate(
  x = -1.5, xend = 2.5, y = 0, yend = 0, 
  lwd = 0.25, geom = "segment"
) + xlab("Estimate (probit)") + theme(text = element_text(size = 18))
ggsave("data/figures/meta.png", plot=last_plot(), device="png", dpi="retina", width=9, height=3)


# Plural attractor


summaries = map(m, model_summary) %>%
  map(rownames_to_column) %>%
  map(filter, rowname=="c_mis")
summaries$tl1$rowname = "Turk & Logacev (Exp1) Plurality"
summaries$tl2b$rowname = "Turk & Logacev (Exp2) Plurality"
summaries$tl3$rowname = "Turk & Logacev (Exp3) Plurality"
summaries$hsd$rowname = "Hammerly et al. (2019) Plurality"
summaries$lago$rowname = "Lago et al. (2019) Plurality"
summaries$meta$rowname = "Mean Plurality"


summaries = bind_rows(
  summaries$tl1, summaries$tl2b, summaries$tl3, 
  summaries$hsd, summaries$lago, summaries$meta
)
summaries$rowname <- factor(summaries$rowname, levels=c(
  "Mean Plurality", "Turk & Logacev (Exp2) Plurality",  "Turk & Logacev (Exp1) Plurality", 
  "Lago et al. (2019) Plurality", "Hammerly et al. (2019) Plurality", "Turk & Logacev (Exp3) Plurality"
))

pm$interactions_pl = brms_plot(
  summaries, sumtable = TRUE, 
  plot_stats = T, 
  expand_right = 1, expand_top = 2,
  x_stat_adjust = 0.4, x_breaks = seq(-1, .5, 0.5)
) + annotate(
  x = -1, xend = .5, y = 0, yend = 0, 
  lwd = 0.25, geom = "segment"
) + xlab("Estimate (probit)") + theme(text = element_text(size = 18))
ggsave("data/figures/meta_pl.png", plot=last_plot(), device="png", dpi="retina", width=9, height=3)




saveRDS(pm, "data/model_plots.RData")

