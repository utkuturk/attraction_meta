set.seed(01110011)
fname_data = "data/data.rds"
library(gdata)
library(magrittr)
library(purrr)
library(dplyr)
library(ggplot2)
library(ggsci)
select = dplyr::select
invisible(lapply(list.files("code/util/", full.names = T), source))
data = readRDS(fname_data)

# Bias and Avg Plots



data$tl1 %<>% get_bias(control = T, threeway = F)
data$tl2 %<>% get_bias(control = F, threeway = F) # noeffect
data$tl2b %<>% get_bias(control = F, threeway = F) 
data$tl3 %<>% get_bias(control = F, threeway = F)
data$hsd %<>% get_bias(control = F, threeway = F)
data$lago %<>% get_bias(control = T, threeway = F)

saveRDS(data, file = fname_data)

# Get Averages
avgs = list()
avgs = map(
  map(data, filter, experiment == "AgrAttr"), 
  Rmisc::summarySE, 
  measurevar = "response_yes",
  groupvars = c("grammatical", "attractor_num", "c_bias"),
  na.rm = TRUE
  )

# Plot
p = list()
p = map(avgs, plot_avgs, threeway = F)
ggsave("data/figures/hsd_avg.png", plot=p$hsd, device="png", dpi="retina", width=10, height=5)
ggsave("data/figures/tl3_avg.png", plot=p$tl3, device="png", dpi="retina", width=10, height=5)
saveRDS(p, "data/p_avg.RData")



