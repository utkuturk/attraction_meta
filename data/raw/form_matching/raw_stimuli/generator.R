library(dplyr)
library(magrittr)

#View <- function(x) {}

experimental <- readxl::read_excel("./agreementattraction_experiment2.xlsx")
filler_gram_pl <- readxl::read_excel("./agreementattraction_experiment2.xlsx" , sheet = 2)
filler_ungram_sg <- readxl::read_excel("./agreementattraction_experiment2.xlsx" , sheet = 3)
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
experimental$condition_a <- with(experimental, paste(rc_plural, head, adjunct, verb_plural , sep = " "))

#PL-SG-Vsg
experimental$condition_b <- with(experimental, paste(rc_plural, head, adjunct, verb , sep = " "))

#SG-SG-Vpl
experimental$condition_c <- with(experimental, paste(rc, head, adjunct, verb_plural , sep = " "))

#SG-SG-Vsg
experimental$condition_d <- with(experimental, paste(rc, head, adjunct, verb , sep = " "))

experimental$item <- 1:40

# extract sentences
stim_exp <- experimental %>% dplyr::select(condition_a:condition_d, item)
stim_exp %<>% tidyr::gather(condition, sentence, condition_a:condition_d)
stim_exp %<>% arrange(item, condition)
head(stim_exp)

stim_exp$ibex_sentence <- with(stim_exp, sprintf('[["%s", %d], "DashedAcceptabilityJudgment", {s: "%s"}]', condition, item, sentence))
head(stim_exp)
View(stim_exp)

#singuler fillers
#fillers <- rbind(filler_gram_pl,filler_ungram_sg)
filler_ungram_sg$filler <- with(filler_ungram_sg, paste(rc_sg, embedded_sbj, embedded_verb, obj, adv, mv, sep = " "))
#fillers$filler <- with(fillers, paste(gen, poss, converb, obj , dist1, dist2, sep = " "))

#fillers$item <- 101:140
filler_ungram_sg$item <- 101:120

stim_fill_sg <- filler_ungram_sg %>% dplyr::select(filler, item)
stim_fill_sg %<>% tidyr::gather(condition, sentence, filler)
stim_fill_sg %<>% arrange(item, condition)
stim_fill_sg$ibex_sentence <- with(stim_fill_sg, sprintf('[["%s", %d], "DashedAcceptabilityJudgment", {s: "%s"}]', condition, item, sentence))

#plural fillers
#fillers <- rbind(filler_gram_pl,filler_ungram_sg)
filler_gram_pl$filler <- with(filler_gram_pl, paste(rc, emb_sbj, emb_v_part1, emb_v_part2, matrix_v_part1, matrix_v_part2, sep = " "))
#fillers$filler <- with(fillers, paste(gen, poss, converb, obj , dist1, dist2, sep = " "))

#fillers$item <- 101:140
filler_gram_pl$item <- 121:140

stim_fill_pl <- filler_gram_pl %>% dplyr::select(filler, item)
stim_fill_pl %<>% tidyr::gather(condition, sentence, filler)
stim_fill_pl %<>% arrange(item, condition)
stim_fill_pl$ibex_sentence <- with(stim_fill_pl, sprintf('[["%s", %d], "DashedAcceptabilityJudgment", {s: "%s"}]', condition, item, sentence))

fillers <- rbind(stim_fill_pl,stim_fill_sg)


stim_exp_string <- paste(stim_exp$ibex_sentence, collapse = ",\n") 
filler_string <- paste(fillers$ibex_sentence, collapse = ",\n")
sentences_string <- paste(stim_exp_string, filler_string, sep = ",\n")
  
file.copy("stimuli_template_top", "stimuli.js", overwrite = T)
file_out <- "stimuli.js" #file("stimuli.js", encoding = "UTF-8")
cat(sentences_string, file = file_out, append = T )
cat( paste(readLines("stimuli_template_bottom", encoding = "utf-8"), collapse = "\n"), file = file_out, append = T)
