#!/usr/bin/env bash

echo "Running script with $1 $2"

echo 'process csv'
npm start -- $1 $2
echo 'generate graphs'
Rscript stats.r $1 $2