#!/usr/bin/env bash
# Ping IndexNow (Bing, Yandex, Seznam, Naver...) with every URL in sitemap.xml.
# Run after deploying new or updated pages:  ./scripts/indexnow.sh
set -euo pipefail

HOST="thesisstocks.vercel.app"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
KEYFILE="$(ls "$ROOT" | grep -E '^[0-9a-f]{32}\.txt$' | head -1)"
KEY="${KEYFILE%.txt}"

URLS=$(grep -o '<loc>[^<]*</loc>' "$ROOT/sitemap.xml" | sed -E 's#</?loc>##g' | sed 's/.*/"&"/' | paste -sd, -)

curl -sS -w "\nHTTP %{http_code}\n" -X POST "https://api.indexnow.org/indexnow" \
  -H "Content-Type: application/json; charset=utf-8" \
  -d "{\"host\":\"$HOST\",\"key\":\"$KEY\",\"keyLocation\":\"https://$HOST/$KEYFILE\",\"urlList\":[$URLS]}"
