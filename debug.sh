#!/bin/bash

. ~/bin/bash/functions

print_info "Begin debugging curapps.com server..."
DEBUG=curapps* node server.js
