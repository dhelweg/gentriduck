#!/usr/bin/env bash
# Publish the built Evidence site (web/build) to the `gh-pages` branch for GitHub Pages.
#
# ADR-0012 / #144: the public site soft-launches on GitHub Pages (documented fallback host)
# because the self-hosted duckdb-wasm assets (~37 MiB) exceed Cloudflare Pages' 25-MiB/file
# limit. Cloudflare re-assessment tracked in #146.
#
# The GitHub Pages site tracks `main` (the published, human-gated branch). Run this MANUALLY after
# each weekly `develop -> main` merge that changed web/** or a published mart (ADR-0012 Amendment A;
# "refresh = rebuild + redeploy"). The raw data and built site are gitignored and rebuilt from source,
# so there is no CI build — build locally (from `main`) where the data lives, then run this to
# publish. Full sequence:
#
#     uv run poe refresh                       # data -> data/serving/*.parquet + web/static/geo/*.geojson
#     cd web && npm ci && npm run sources && npm run build   # -> web/build/ (incl. noindex meta)
#     cd .. && ops/deploy-gh-pages.sh          # publish web/build -> gh-pages
#
# One-time GitHub setup (maintainer, in the repo's web UI): Settings -> Pages ->
# "Build and deployment" -> Source: "Deploy from a branch" -> Branch: gh-pages / (root).
#
# The gh-pages branch is force-replaced with a single fresh commit each deploy (no history
# bloat) and is a generated artefact branch — never merge it into develop/main.
set -euo pipefail

cd "$(git rev-parse --show-toplevel)"
BUILD_DIR="web/build"

if [ ! -d "$BUILD_DIR" ] || [ -z "$(ls -A "$BUILD_DIR" 2>/dev/null)" ]; then
  echo "error: $BUILD_DIR is empty. Build the site first (see the sequence in this script's header)." >&2
  exit 1
fi

origin="$(git remote get-url origin)"
tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT

cp -a "$BUILD_DIR/." "$tmp/"
# .nojekyll: without it GitHub Pages runs Jekyll, which strips Evidence's `_app/` directory
# (leading underscore) and breaks the site.
touch "$tmp/.nojekyll"

author_name="${GIT_AUTHOR_NAME:-$(git config user.name || true)}"
author_email="${GIT_AUTHOR_EMAIL:-$(git config user.email || true)}"
if [ -z "$author_name" ] || [ -z "$author_email" ]; then
  echo "error: no git author identity. Set git config user.name/user.email (or GIT_AUTHOR_NAME/EMAIL)." >&2
  exit 1
fi

git -C "$tmp" init -q
git -C "$tmp" checkout -q -b gh-pages
git -C "$tmp" add -A
git -C "$tmp" -c user.name="$author_name" -c user.email="$author_email" \
  commit -q -m "deploy: gh-pages $(date -u +%FT%TZ) (source $(git rev-parse --short HEAD))"
git -C "$tmp" push --force "$origin" gh-pages

echo "Deployed web/build -> gh-pages. Live once GitHub Pages is enabled (Settings -> Pages -> Source: gh-pages)."
