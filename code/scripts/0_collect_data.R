set.seed(01110011)

library(magrittr)
library(dplyr)
library(gdata)

invisible(lapply(list.files("code/util/", full.names = T), source))

data = list()

# Turk Logacev Experiment 1 Data ------
source("code/scripts/0-1_exp1.R")

# Turk Logacev Experiment 2 Data ---------
source("code/scripts/0-2_exp2.R")

# Turk Logacev Experiment 2b Data ---------
source("code/scripts/0-2_exp2b.R")

# Turk Logacev Experiment 3 Data -------
source("code/scripts/0-3_exp3.R")


# Hammerly, Staub, Dillon 2019 Data ----------
source("code/scripts/0-4_hsd.R")


# Lago --------
source("code/scripts/0-5_lago.R")

# Add more ---------


# output -----------
saveRDS(data, file = "data/data.rds")
