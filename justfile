default:
    @just --list

install:
    pnpm install

dev:
    pnpm dev

build:
    pnpm build

preview: build
    pnpm preview

# Renders public/og-image.jpg from tool/og-image.html
og-image chrome="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome":
    CHROME_PATH="{{chrome}}" node tool/og-image.mjs

deploy: build
    npx wrangler deploy

# Screenshots of every page at 390 and 1280 px into .screenshots/<label>/ (needs `just preview` running)
screenshots label="after" chrome="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome":
    CHROME_PATH="{{chrome}}" node tool/screenshots.mjs {{label}}

# Lighthouse on mobile and desktop into .screenshots/lighthouse/ (needs `just preview` running)
lighthouse label="after" chrome="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome":
    CHROME_PATH="{{chrome}}" tool/lighthouse.sh {{label}}
