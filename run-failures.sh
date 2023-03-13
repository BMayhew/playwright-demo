#!/bin/bash

<<info 
    pre-requisites: install jq on mac command is: brew install jq
    must install playwright-json-summary-reporter - https://www.npmjs.com/package/playwright-json-summary-reporter
    running the script: sh run-failures.sh <URL>
info

if [ $# -eq 0 ]
  then
    URL="https://www.automationexercise.com"
  else
    URL=$1
fi

failed=`cat summary.json | jq -r '.failed[]' |  tr '\n' ' '`
timed_out=`cat summary.json | jq -r '.timedOut[]' |  tr '\n' ' '`
echo "URL=$URL npx playwright test $failed $timed_out --workers=1"

# Below is the actual command that gets run
URL=$URL npx playwright test $failed $timed_out --workers=1
