set.seed(01110011)
fname_data = "data/data.rds"
fname_p = "data/p_avg.RData"
library(gdata)
library(magrittr)
library(purrr)
library(dplyr)
library(ggplot2)
library(ggsci)
library(brms)
library(tibble)
select = dplyr::select
invisible(lapply(list.files("code/util/", full.names = T), source))
data = readRDS(fname_data)
p = readRDS(fname_p)


# Contrast Coding

code_contrasts <- function(df) {
  df %<>% within(., {
    c_ung <- ifelse(grammatical == "ungram", .5, -.5)
    c_mis <- ifelse(attractor_num == "pl", .5, -.5)
    l_trial <- log(trial_no)
  })
}

data %<>% map(code_contrasts)

# Bayes Model


myformula = bf(response_yes ~ bias * c_mis + l_trial +
                 (bias * c_mis + 1 | subject) +
                 (c_mis + l_trial + 1 | item))

myprior = c(
  set_prior("normal(0,1)", class = "Intercept"),
  set_prior("normal(0,1)", class = "b"),
  set_prior("normal(0,1)", class = "sd"),
  set_prior("lkj(2)", class = "cor")
)

mycoefs <- c(
  "bias" = "Bias Decrease",
  "c_mis" = "Plural Attactor",
  "l_trial" = "Trial No (log)",
  "bias:c_mis" = "Interaction"
)

mybrms <- function(df) {
  tempdata = df %>% filter(grammatical == "gram") %>% filter(experiment != "filler")
  m = brm(
    formula = myformula,
    data = tempdata,
    family = bernoulli("probit"), 
    prior = myprior,
    chains = 4, cores = 4,
    warmup = 2000,iter = 8000,
    control = list(adapt_delta = 0.9),
    backend="cmdstanr", 
    stan_model_args=list(stanc_options = list("O1")), 
    file = paste0("data/models/", gsub("data\\$", "", deparse(substitute(df))))
  )
  m
}

m = list()
m$tl1 = mybrms(data$tl1)
m$tl2b = mybrms(data$tl2b)
m$tl3 = mybrms(data$tl3)
m$hsd = mybrms(data$hsd)
m$lago = mybrms(data$lago)

saveRDS(m, "data/models.RData")

# plots 

# TODO: BIGGER FONTS
# TODO: BIGGER DOT

pm = list()
pm$tl1 = brms_plot(
  m$tl1, exclude_names = "l_trial",
  plot_stats = T, map_names = mycoefs,
  expand_right = 1, expand_top = 4,
  x_stat_adjust = 0.5, x_breaks = -2:2
) + annotate(
  x = -2, xend = 2, y = 0, yend = 0, 
  lwd = 0.25, geom = "segment"
) + xlab("Estimate (probit)") + theme(text = element_text(size = 18))


pm$tl2b = brms_plot(
  m$tl2b, exclude_names = "l_trial",
  plot_stats = T, map_names = mycoefs,
  expand_right = 1, expand_top = 4,
  x_stat_adjust = 0.5, x_breaks = seq(-1.5, 1.5, 0.5)
) + annotate(
  x = -1.5, xend = 1.5, y = 0, yend = 0, 
  lwd = 0.25, geom = "segment"
) + xlab("Estimate (probit)") + theme(text = element_text(size = 18))


pm$tl3 = brms_plot(
  m$tl3, exclude_names = "l_trial",
  plot_stats = T, map_names = mycoefs,
  expand_right = 1, expand_top = 4,
  x_stat_adjust = 0.3, x_breaks = seq(-1.5, 0.5, 0.5)
) + annotate(
  x = -1.5, xend = .5, y = 0, yend = 0, 
  lwd = 0.25, geom = "segment"
) + xlab("Estimate (probit)") + theme(text = element_text(size = 18))
ggsave("data/figures/tl3.png", plot=last_plot(), device="png", dpi="retina", width=8, height=3)

pm$hsd = brms_plot(
  m$hsd, exclude_names = "l_trial",
  plot_stats = T, map_names = mycoefs,
  expand_right = 1, expand_top = 4,
  x_stat_adjust = 0.4, x_breaks = seq(-1, 1, 0.5)
) + annotate(
  x = -1, xend = 1, y = 0, yend = 0, 
  lwd = 0.25, geom = "segment"
) + xlab("Estimate (probit)") + theme(text = element_text(size = 18))
ggsave("data/figures/hsd.png", plot=last_plot(), device="png", dpi="retina", width=8, height=3)

pm$lago = brms_plot(
  m$lago, exclude_names = "l_trial",
  plot_stats = T, map_names = mycoefs,
  expand_right = 1, expand_top = 4,
  x_stat_adjust = 0.4, x_breaks = seq(-1.5, 2.5, 0.5)
) + annotate(
  x = -1.5, xend = 2.5, y = 0, yend = 0, 
  lwd = 0.25, geom = "segment"
) + xlab("Estimate (probit)") + theme(text = element_text(size = 18))


saveRDS(pm, "data/model_plots.RData")

