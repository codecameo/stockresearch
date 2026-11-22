#!/usr/bin/env bash
# Ping IndexNow (Bing, Yandex, Seznam, Naver...) about site pages.
#
#   ./scripts/indexnow.sh                 # every URL in sitemap.xml
#   ./scripts/indexnow.sh <from> [<to>]   # only sitemap pages whose HTML changed
#                                         # between two git refs (<to> defaults to HEAD)
#
# Runs automatically via .github/workflows/indexnow.yml after each
# successful Vercel production deploy.
set -euo pipefail

HOST="thesisstocks.vercel.app"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

KEYFILE="$(ls | grep -E '^[0-9a-f]{32}\.txt$' | head -1)"
KEY="${KEYFILE%.txt}"

SITEMAP_URLS="$(grep -o '<loc>[^<]*</loc>' sitemap.xml | sed -E 's#</?loc>##g')"

if [ $# -eq 0 ]; then
  URLS="$SITEMAP_URLS"
else
  FROM="$1"
  TO="${2:-HEAD}"
  # Map changed HTML files to public URLs:
  #   index.html -> /   foo/index.html -> /foo/   foo.html -> /foo.html
  CHANGED="$(git diff --name-only --diff-filter=AMR "$FROM" "$TO" -- '*.html' \
    | sed -E -e 's#(^|/)index\.html$#\1#' -e "s#^#https://$HOST/#")"
  # Keep only pages listed in the sitemap (skips verification files, delete-account, etc.)
  URLS="$(printf '%s\n' "$CHANGED" | grep -Fx -f <(printf '%s\n' "$SITEMAP_URLS") || true)"
fi

if [ -z "$URLS" ]; then
  echo "No indexable pages changed; nothing to submit."
  exit 0
fi

echo "Submitting:"
printf '  %s\n' $URLS

JSON_URLS="$(printf '%s\n' $URLS | sed 's/.*/"&"/' | paste -sd, -)"

curl -sS -w "HTTP %{http_code}\n" -X POST "https://api.indexnow.org/indexnow" \
  -H "Content-Type: application/json; charset=utf-8" \
  -d "{\"host\":\"$HOST\",\"key\":\"$KEY\",\"keyLocation\":\"https://$HOST/$KEYFILE\",\"urlList\":[$JSON_URLS]}"
