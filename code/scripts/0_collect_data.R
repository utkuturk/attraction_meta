set.seed(01110011)

library(magrittr)
library(dplyr)
library(ggplot2)
library(purrr)


# Turk Logacev Experiment 3 Data
tl_bias_gram <- read_ibexfarm_results("data/raw/hsd_replication_gram/results/results") %>% mutate(V12 = "Gram")
tl_bias_ungram <- read_ibexfarm_results("data/raw/hsd_replication_gram/results/results") %>% mutate(V12 = "Gram")
tl_bias <- bind_rows(tl_bias_gram, tl_bias_ungram)

# Hammerly, Staub, Dillon 2019 Data
hsd1 = read.csv('data/raw/HammerlyEtAl2019/experiment1-all.csv') %>% 
  mutate(subj = subj+100, exp = "1")
hsd3 = read.csv('data/raw/HammerlyEtAl2019/experiment3-all.csv') %>%
  mutate(subj = subj+200, exp = "3")
hsd = bind_rows(hsd1, hsd3)
hsd %<>% filter(response != "NULL")

