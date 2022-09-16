set.seed(01110011)
fname_data = "data/data.rds"

library(gdata)
invisible(lapply(list.files("code/util/", full.names = T), source))
data = readRDS(fname_data)

# make it lapply
data %<>% lapply(., clean_data)
