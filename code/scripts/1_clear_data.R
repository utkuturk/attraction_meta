set.seed(01110011)
fname_data = "data/data.rds"

library(gdata)
invisible(lapply(list.files("code/util/", full.names = T), source))
data = readRDS(fname_data)
data$tl1 = clean_data(data$tl1)
data$tl2 = clean_data(data$tl2)
data$tl3 = clean_data(data$tl3)
data$hsd = clean_data(data$hsd)
data$lago = clean_data(data$lago)
# make it lapply