#!/usr/bin/env bash
echo 'process csv'
npm start
echo 'generate graphs'
Rscript stats.r AUDUSD