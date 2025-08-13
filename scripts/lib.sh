ROOT_DIR="$(pwd)"

function abort() {
    echo "❌ Aborting: $1" >&2
    exit 1
}

function warn() {
    echo "⚠️  $1"
}

function check() {
    printf "\n✅ %s\n" "$1"
}

function info() {
    echo "️✔️  $1"
}

function reloadBrowserSync() {
if ps aux | grep browser-sync | grep -v grep >/dev/null; then
    info "Reloading browser-sync"
    npx browser-sync reload 2&> /dev/null
fi
}

printf "\n💎 Running %s\n" "$0"