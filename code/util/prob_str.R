prob_str <- function(p, gtst = 0.001) {
  if (p < .001) {
    str <- "< .001"
  } else if (p > .999) {
    str <- "> .999"
  } else if (p > .99 | p < .01 ) {
    str <- sprintf("  %.3f", p) %>% gsub("0\\.", ".", .)
  } else {
    str <- sprintf("   %.2f", p) %>% gsub("0\\.", ".", .)
  }
  str
}
