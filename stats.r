input <- 'out'
file.name <- 'AUDUSD-OUT.csv'
data.path <- file.path(input, file.name)
data <- read.table(data.path, header=T,sep=",")

print(sprintf("bestLow %s", max(data$bestLow)))
print(sprintf("bestHigh %s", max(data$bestHigh)))