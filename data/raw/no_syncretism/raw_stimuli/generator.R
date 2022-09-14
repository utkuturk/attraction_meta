library(dplyr)
library(magrittr)

View <- function(x) {}

experimental <- readxl::read_excel("./AgreementAttraction_Experiment.xlsx")
filler_gram_pl <- readxl::read_excel("./AgreementAttraction_Experiment.xlsx" , sheet = 2)
filler_ungram_sg <- readxl::read_excel("./AgreementAttraction_Experiment.xlsx" , sheet = 3)
head(experimental)
head(filler_gram_pl)
head(filler_ungram_sg)

View(experimental)
View(filler_gram_pl)
View(filler_ungram_sg)

experimental %<>% .[1:40,]
filler_gram_pl %<>% .[1:20,]
filler_ungram_sg %<>% .[1:20,]

#experimental$adjunct %<>% gsub(" ", "_", .)

#PL-SG-Vpl
experimental$condition_a <- with(experimental, paste(dp_gen_pl, noun_poss, adjunct, mv_pl , sep = " "))

#PL-SG-Vsg
experimental$condition_b <- with(experimental, paste(dp_gen_pl, noun_poss, adjunct, mv_sg , sep = " "))

#SG-SG-Vpl
experimental$condition_c <- with(experimental, paste(dp_gen_sg, noun_poss, adjunct, mv_pl , sep = " "))

#SG-SG-Vsg
experimental$condition_d <- with(experimental, paste(dp_gen_sg, noun_poss, adjunct, mv_sg , sep = " "))

experimental$item <- 1:40

# extract sentences
stim_exp <- experimental %>% dplyr::select(condition_a:condition_d, item)
stim_exp %<>% tidyr::gather(condition, sentence, condition_a:condition_d)
stim_exp %<>% arrange(item, condition)
head(stim_exp)

stim_exp$ibex_sentence <- with(stim_exp, sprintf('[["%s", %d], "DashedSentence", {s: "%s"}]', condition, item, sentence))
head(stim_exp)
View(stim_exp)
#fillers
fillers <- rbind(filler_gram_pl,filler_ungram_sg)

fillers$filler <- with(fillers, paste(gen, poss, converb, obj , dist1, dist2, sep = " "))
fillers$item <- 101:140
stim_fill <- fillers %>% dplyr::select(filler, item)
stim_fill %<>% tidyr::gather(condition, sentence, filler)
stim_fill %<>% arrange(item, condition)
stim_fill$ibex_sentence <- with(stim_fill, sprintf('[["%s", %d], "DashedSentence", {s: "%s"}]', condition, item, sentence))

stim_exp_string <- paste(stim_exp$ibex_sentence, collapse = ",\n") 
filler_string <- paste(stim_fill$ibex_sentence, collapse = ",\n")
sentences_string <- paste(stim_exp_string, filler_string, sep = ",\n")
  
file.copy("stimuli_template_top", "stimuli.js", overwrite = T)
file_out <- "stimuli.js" #file("stimuli.js", encoding = "UTF-8")
cat(sentences_string, file = file_out, append = T )
cat( paste(readLines("stimuli_template_bottom", encoding = "utf-8"), collapse = "\n"), file = file_out, append = T)
