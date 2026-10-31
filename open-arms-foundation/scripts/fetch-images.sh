#!/usr/bin/env bash
# Downloads the foundation's photos from its old SnapPages site into assets/images/.
# SnapPages serves several sizes of each upload; keep the largest one available.
# Photos already in the folder are left alone (they have been resized for the web).
set -uo pipefail
cd "$(dirname "$0")/.."
mkdir -p assets/images
tmp=$(mktemp -d)
while read -r url; do
  [ -z "$url" ] && continue
  file=$(basename "$url" | sed 's/_500\././')
  dest="assets/images/$file"
  [ -s "$dest" ] && continue
  best=0
  for v in "" _2500 _2000 _1500 _1200 _1000 _800 _500; do
    try="${url/_500./$v.}"
    if curl -fsSL "$try" -o "$tmp/img" && file -b --mime-type "$tmp/img" | grep -q '^image/'; then
      size=$(stat -c %s "$tmp/img")
      if [ "$size" -gt "$best" ]; then
        mv "$tmp/img" "$dest"; best=$size
        echo "saved ${v:-original}  $file  ($size bytes)"
      fi
    fi
  done
  [ -s "$dest" ] || echo "FAILED  $file" >&2
done < scripts/image-urls.txt
rm -rf "$tmp"
