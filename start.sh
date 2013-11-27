#!/bin/bash

. /home/evan/bin/bash/functions

print_info "Checking if server is already running"

if [[ $(ps ax | grep "curapps" | grep -v grep) == "0" ]]; then
  PID=$(ps ax | grep "curapps" | grep -v grep | awk '{print $1}')
  print_error "Curappsserver is already running [PID $PID]"
  exit 1
fi

print_info "Starting curapps.com"

/opt/local/bin/node /home/evan/dev/code/curapps.com/server.js 2>&1 >> /home/evan/dev/code/curapps.com/curapps.log &
