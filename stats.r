library(plyr)
library(ggplot2)
library(reshape)
library(scales)


args <- commandArgs(trailingOnly = TRUE)

symbol <- args[1]

symbol='AUDUSD'

print(sprintf("Running with Symbol %s", symbol))

input <- 'out'
file.name <- paste(symbol,'-OUT.csv', sep="")
data.path <- file.path(input, file.name)
data <- read.table(data.path, header=T,sep=",")



highRow <- data[which.max(data$bestHigh),]

lowRow <- data[which.max(data$bestLow),]

print(sprintf("bestLow %s %s", lowRow$date, lowRow$bestLow))
print(sprintf("bestHigh %s %s", highRow$date, highRow$bestHigh))

highFrequency <- count(data, 'bestHigh')

longFreq <- rename(highFrequency, c("bestHigh"="ticks", "freq"="longFreq"))

lowFrequency <- count(data, 'bestLow')
shortFreq <- rename(lowFrequency, c("bestLow"="ticks", "freq"="shortFreq"))

mergedFrequencies <- merge(longFreq, shortFreq, by='ticks')

meltedFrequencies <- melt(mergedFrequencies, id.vars="ticks", measure.vars=c("longFreq", "shortFreq"))

meltedFrequencies <- rename(meltedFrequencies, c("variable"="direction", "value"="frequency"))

log_breaks_125 <- function(...) c(1, 2, 5) %o% log_breaks()(...)


breaks = seq(min(meltedFrequencies$frequency),max(meltedFrequencies$frequency), length.out = 10)

p <- ggplot(data=meltedFrequencies, aes(x=ticks, y=frequency, fill=direction)) +
geom_bar(stat="identity") +
scale_y_log10(breaks = scales::trans_breaks("log10", function(x) 10^x), labels = scales::trans_format("log10", scales::math_format(10^.x))) +
scale_x_continuous(breaks=seq(0,100,5)) +
ggtitle(paste('Expected Ticks'))

dir.create('graphs')

output <- file.path('graphs', paste(symbol, '.png', sep=""))

ggsave(output, p, device='png')


