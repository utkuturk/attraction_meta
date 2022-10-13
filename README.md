# Meta-Analysis of Response Bias in Attraction

Currently, the analysis includes following experiments:

- Hammerly et al. 2019
- Lago et al. 2019
- Turk & Logacev (Exps 1, 2a, 2b, 3) 

Following packages and softawres are needed:

- brms
- magrittr
- purr
- dplyr
- ggplot2
- ggsci
- gdata

To do the whole analysis from scratch:

- First source the files in /code/utils
- Then run the following files in /code/scripts in the following order:
  - 0_collect_data.R
  - 1_clear_data.R
  - 2_eda.R
  - 3_models.R
  - 4_meta.R
