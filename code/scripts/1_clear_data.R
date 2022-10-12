set.seed(01110011)
fname_data = "data/data.rds"

library(gdata)
library(magrittr)
library(dplyr)
library(purrr)
invisible(lapply(list.files("code/util/", full.names = T), source))
data = readRDS(fname_data)

# make it lapply
sink("code/console_outputs/data_cleaning.txt")
data %<>% map(., clean_data, accuracy_threshold = 0.0, rt_below = 0, rt_upper = 4999)
sink()
saveRDS(data, file = fname_data)
