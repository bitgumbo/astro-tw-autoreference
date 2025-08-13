#!/usr/bin/env bash

##
# Build the sandbox project
#
# If the astro build fails, the error output will be crafted into the index.html file
#
# Usage: ./scripts/sandbox-build.sh
##

source scripts/lib.sh

cd astro-sandbox || abort "Error: could not change directory to 'astro-sandbox'"

# if build fails, inject it's output
check "Building the Astro sandbox"

if  OUTPUT=$(astro build 2>&1); then
  info "Astro build completed successful"

else
  warn "Build failed, injecting error message into index.html"
  [[ ! -d dist ]] && mkdir dist
  cat > dist/index.html <<EOF
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>Astro Build Error</title>
<style>
  body { font-family: monospace; white-space: pre-wrap; background: #222; color: #f88; padding: 2rem; }
</style>
</head>
<body>
<h1>Astro Build Failed</h1>
<pre>${OUTPUT//</pre>/<\\/pre>}</pre>
</body>
</html>
EOF
fi

# Push changes to browser-sync
reloadBrowserSync
