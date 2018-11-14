##Setup

You need to install Rcpp first with

`install.packages("Rcpp",type="source")`

and then pylr

`install.packages('plyr')`



## To execute the node part

`node index.js --in data/AUDUSD.csv --out out/AUDUSD-OUT.csv`

## To execute the R part

`Rscript stats.r`