#!/usr/bin/env bash

echo "Running script with $1 $2 $3"

echo 'process csv'
npm start -- $1 $2 $3
echo 'generate graphs'
Rscript stats.r $1 $3