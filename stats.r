library(plyr)
library(ggplot2)
library(reshape)
library(scales)
library(argparse)

parser <- ArgumentParser()

parser$add_argument("-s", "--symbol", help="The symbol to use")
parser$add_argument("-t", "--timePeriod", help="The timePeriod to use")

args <- parser$parse_args()

symbol <- args$symbol
timePeriod <- args$timePeriod

print(sprintf("Running with Symbol %s and timePeriod %s", symbol, timePeriod))

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
ggtitle(paste('Expected Ticks ', symbol, timePeriod))

dir.create('graphs')

output <- file.path('graphs', paste(symbol, '-', timePeriod, '.png', sep=""))

ggsave(output, p, device='png')


