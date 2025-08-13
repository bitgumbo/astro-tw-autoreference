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

source scripts/lib.sh

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
    check "Deleting existing astro-sandbox directory"
    rm -rf "astro-sandbox"
  else
    abort "astro-sandbox directory already exists"
  fi
fi

# Build and publish this package to yalc
check "Building and publishing package to yalc"
npm run build  && yalc publish 

# Create new astro project
check "Creating astro project in astro-sandbox"
npm create astro@latest -- --no-git --template minimal  -n "astro-sandbox"

# Move into the new project
cd "astro-sandbox" || abort "Failed to cd into astro-sandbox"

# Install dependencies
check "Installing dependencies"
npm install -D tailwindcss @tailwindcss/vite
npx yalc add astro-tw-autoreference
npm install

# Files to be copied into the sandbox
declare -A TEMPLATES
TEMPLATES["astro.config.mjs"]="astro.config.mjs"
TEMPLATES["tailwind.css"]="src/styles/tailwind.css"
TEMPLATES["index.astro"]="src/pages/index.astro"

# Copy template files
 for key in "${!TEMPLATES[@]}"; do
   src="$ROOT_DIR/scripts/templates/$key"
   dst="${TEMPLATES[$key]}"
   if [[ -f "$src" ]]; then
     info "Creating $dst"
     mkdir -p "$(dirname "$dst")"
     cp "$src" "$dst"
    else
      warn "Failed to copy source '$src': file not found"
   fi
 done

# All done!
check "Astro sandbox created in ./astro-sandbox"
