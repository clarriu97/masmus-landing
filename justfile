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
