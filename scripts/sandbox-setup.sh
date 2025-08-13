#!/usr/bin/env bash

##
# Setup a sandbox project to test this package
#
# This will create a minimum astro project in `./astro-sandbox`, install needed dependencies
# and create needed files to test this package.
#
# Usage: ./scripts/setup-astro-sandbox.sh [-D | --delete]
#
# -D | --delete: delete existing sandbox directory
##

set -euo pipefail

# Abort with error message
function abort() {
  echo "❌ Aborting: $1" >&2
  exit 1
}

# Log Message
function log() {
  printf "\n✅ %s\n" "$1"
}

# Parse command line options
DELETE=false
while [[ $# -gt 0 ]]; do
  case $1 in
    -D | --delete)
      DELETE=true
      shift 
      ;;
    *)
      echo "Unknown option: $1"
      echo "Usage: $0 [-D | --delete]"
      exit 1
      ;;
  esac
done

# Optionally delete existing sandbox
if [[ -d "astro-sandbox" ]]; then
  if $DELETE; then
    log "Deleting existing astro-sandbox directory"
    rm -rf "astro-sandbox"
  else
    abort "Error: astro-sandbox directory already exists"
  fi
fi

# Build and publish this package to yalc
log "Building and publishing package to yalc"
npm run build  && yalc publish 

# Create new astro project
log "Creating astro project in astro-sandbox"
npm create astro@latest -- --no-git --template minimal  -n "astro-sandbox"

# Move into the new project
cd "astro-sandbox" || abort "Failed to cd into astro-sandbox"

# Install dependencies
log "Installing dependencies"
npm install -D tailwindcss @tailwindcss/vite
npx yalc add astro-tw-autoreference
npm install

# Create astro.config.mjs
log "Creating astro.config.mjs"
echo '
// @ts-check

import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import twAutoReference from "astro-tw-autoreference";

export default defineConfig({
  vite: {
    plugins: [twAutoReference({
      referencePath: "../styles/tailwind.css",
    }), tailwindcss()],
  },
});
' > ./astro.config.mjs

# Create src/styles/tailwind.css
log "Creating src/styles/tailwind.css"
mkdir -p src/styles
echo '@import "tailwindcss";
' > src/styles/tailwind.css

# Create src/pages/index.astro
log "Creating src/pages/index.astro"
echo '
---
import "../styles/tailwind.css";
---

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>astro-aw-autoreference test</title>
</head>
<body>
    <h1>This is only a test</h1>
</body>
</html>

<style>
  h1 {
    @apply bg-green-500;
  }
</style>
' > ./src/pages/index.astro

# All done!
log "Astro sandbox created in ./astro-sandbox"
