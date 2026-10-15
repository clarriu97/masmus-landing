#!/usr/bin/env bash
set -euo pipefail
label="${1:-after}"
url="${URL:-http://localhost:4173/}"
mkdir -p .screenshots/lighthouse
for form in mobile desktop; do
  preset=()
  [ "$form" = desktop ] && preset=(--preset=desktop)
  out=".screenshots/lighthouse/$label-$form.json"
  npx -y lighthouse "$url" --chrome-flags="--headless=new" \
    --only-categories=performance,accessibility,best-practices,seo \
    --output=json --output-path="$out" --quiet ${preset[@]+"${preset[@]}"}
  node -e "const r=require('./$out');console.log('$form', Object.values(r.categories).map(c=>c.id+' '+Math.round(c.score*100)).join(' · '), '· CLS', r.audits['cumulative-layout-shift'].displayValue, '· LCP', r.audits['largest-contentful-paint'].displayValue)"
done
