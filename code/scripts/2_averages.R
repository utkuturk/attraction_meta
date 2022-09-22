set.seed(01110011)
fname_data = "data/data.rds"
library(gdata)
library(magrittr)
library(dplyr)
invisible(lapply(list.files("code/util/", full.names = T), source))
data = readRDS(fname_data)

# Get Averages
avgs = lapply(data, get_averages)

# Plot
