#!/usr/bin/env bash

# set -euo pipefail

function abort() {
    echo "❌ Aborting: $1" >&2
    exit 1
}

cd astro-sandbox || abort "Error: could not change directory to 'astro-sandbox'"

# Try building, capture errors
if ! OUTPUT=$(astro build 2>&1); then
  echo "Build failed, injecting error message into index.html"
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

npx browser-sync reload

