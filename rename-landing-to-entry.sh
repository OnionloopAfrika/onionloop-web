#!/usr/bin/env bash
# Renames apps/landing -> apps/entry and updates every reference.
# Run from the monorepo root. Safe to run more than once, works on macOS and Linux.
set -euo pipefail

[ -d apps ] || { echo "Run this from the monorepo root (the folder that contains apps/)."; exit 1; }

# 1. folder
if [ -d apps/landing ] && [ ! -e apps/entry ]; then
  if git rev-parse --is-inside-work-tree >/dev/null 2>&1 && [ -n "$(git ls-files apps/landing | head -1)" ]; then
    git mv apps/landing apps/entry
  else
    mv apps/landing apps/entry
  fi
elif [ -d apps/landing ] && [ -d apps/entry ]; then
  # leftover from an earlier partial run: only leftovers (e.g. .DS_Store) may remain
  rm -f apps/landing/.DS_Store
  rmdir apps/landing 2>/dev/null || { echo "apps/landing still has files in it:"; ls -A apps/landing; echo "Move anything you need into apps/entry, delete apps/landing, then re-run."; exit 1; }
fi
[ -d apps/entry ] || { echo "apps/entry not found - nothing to do."; exit 1; }

# 2. references (sed -i.bak works on both macOS and GNU sed)
for f in README.md deploy/Caddyfile docker-compose.yml package.json \
         apps/entry/package.json apps/crew/app/page.tsx apps/mega/app/page.tsx apps/aggregator/app/page.tsx; do
  [ -f "$f" ] || continue
  sed -i.bak -e 's/landing    /entry      /g' -e 's/Landing/Entry/g' -e 's/landing/entry/g' "$f"
  rm -f "$f.bak"
done

# 3. lockfile
pnpm install --lockfile-only

echo
echo "Done. Leftover mentions of 'landing' (only defaultLandingPage in the crew API doc is expected):"
grep -rIn -i "landing" . --exclude-dir=node_modules --exclude-dir=.git --exclude-dir=.next --exclude=pnpm-lock.yaml || echo "none"