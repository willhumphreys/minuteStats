library(plyr)

input <- 'out'
file.name <- 'AUDUSD-OUT.csv'
data.path <- file.path(input, file.name)
data <- read.table(data.path, header=T,sep=",")



highRow <- data[which.max(data$bestHigh),]

lowRow <- data[which.max(data$bestLow),]

print(sprintf("bestLow %s %s", lowRow$date, lowRow$bestLow))
print(sprintf("bestHigh %s %s", highRow$date, highRow$bestHigh))

count(data, 'bestHigh')
count(data, 'bestLow')