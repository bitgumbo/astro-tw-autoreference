#!/usr/bin/env bash

set -euo pipefail

function serve() {
    browser-sync start --server 'astro-sandbox/dist' --files 'astro-sandbox/dist/**/*' 
}

function watch() {
    chokidar 'dist/**/*.js' --debounce 1000 -c '
        yalc push && 
        scripts/sandbox-build.sh
    '
}

yalc push
scripts/sandbox-build.sh
npm run watch:ts & watch & serve; wait