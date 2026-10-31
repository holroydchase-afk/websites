#!/usr/bin/env bash
# Downloads the foundation's photos from its old SnapPages site into assets/images/.
# Tries the larger 1500px version first and falls back to the 500px one.
set -euo pipefail
cd "$(dirname "$0")/.."
mkdir -p assets/images
while read -r url; do
  [ -z "$url" ] && continue
  file=$(basename "$url" | sed 's/_500\././')
  dest="assets/images/$file"
  [ -s "$dest" ] && continue
  if curl -fsSL "${url/_500./_1500.}" -o "$dest"; then
    echo "1500px  $file"
  elif curl -fsSL "$url" -o "$dest"; then
    echo "500px   $file"
  else
    echo "FAILED  $file" >&2; rm -f "$dest"
  fi
done < scripts/image-urls.txt
