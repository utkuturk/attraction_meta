set.seed(01110011)
fname_data = "data/data.rds"

library(gdata)
library(magrittr)
library(dplyr)
invisible(lapply(list.files("code/util/", full.names = T), source))
data = readRDS(fname_data)

# make it lapply
sink("code/console_outputs/data_cleaning.txt")
data %<>% lapply(., clean_data)
sink()
saveRDS(data, file = "data/data.rds")
