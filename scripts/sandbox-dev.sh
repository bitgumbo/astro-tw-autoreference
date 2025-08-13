#!/usr/bin/env bash

##
# Run the development sandbox environment
#
# Will build the astro project, serve its dist folder and watch for changes
#
# Usage: ./scripts/sandbox-dev.sh
##

set -euo pipefail

source scripts/lib.sh

# Kill background jobs on exit
cleanup() {
    info "Cleaning up background processes..."
    jobs -p | xargs -r kill
}
trap cleanup EXIT

# Serve the astro build files and reload on change
function serve() {
    info "Starting browser-sync"
    browser-sync start --server 'astro-sandbox/dist' >& /dev/null
}

# Watch tsc output, push to yalc and rebuild the sandbox
function watch() {
    info "Watching tsc output for changes"
    chokidar 'dist/**/*.js' --debounce 500 -c '
        yalc push && 
        scripts/sandbox-build.sh
    '
}

# Make sure yalc is up to date
info "Syncing to yalc"
npm run build
yalc push

# Build the sandbox
scripts/sandbox-build.sh

# Watch and serve
watch & serve; wait
