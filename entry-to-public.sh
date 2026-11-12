#!/usr/bin/env bash
# Moves the static entry page into apps/entry/public/ (Vercel's default output directory)
# and updates the references. Run from the monorepo root. Safe to re-run. Works on macOS and Linux.
set -euo pipefail
[ -d apps/entry ] || { echo "apps/entry not found - run this from the monorepo root."; exit 1; }

mkdir -p apps/entry/public
for item in index.html styles.css config.js assets; do
  if [ -e "apps/entry/$item" ]; then
    if git rev-parse --is-inside-work-tree >/dev/null 2>&1 && [ -n "$(git ls-files "apps/entry/$item" | head -1)" ]; then
      git mv "apps/entry/$item" "apps/entry/public/$item"
    else
      mv "apps/entry/$item" "apps/entry/public/$item"
    fi
  fi
done

edit() { sed -i.bak -e "$1" "$2" && rm -f "$2.bak"; }
[ -f docker-compose.yml ]     && edit 's#\./apps/entry:/srv/entry:ro#./apps/entry/public:/srv/entry:ro#' docker-compose.yml
[ -f apps/entry/package.json ] && edit 's#serve@14 \. -l 3000#serve@14 public -l 3000#g' apps/entry/package.json
[ -f README.md ]              && edit 's#`apps/entry/config.js`#`apps/entry/public/config.js`#' README.md

echo "Done. apps/entry now contains:"; ls -A apps/entry; echo "public/:"; ls -A apps/entry/public