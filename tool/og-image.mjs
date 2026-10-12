import { chromium } from 'playwright-core'
import { createServer } from 'vite'

const executablePath = process.env.CHROME_PATH
if (!executablePath) {
  console.error('Set CHROME_PATH to a Chrome or Chromium-based browser binary.')
  process.exit(1)
}

const server = await createServer({ server: { port: 5199, strictPort: true }, logLevel: 'error' })
await server.listen()
const browser = await chromium.launch({ executablePath })
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } })
await page.goto('http://localhost:5199/tool/og-image.html', { waitUntil: 'networkidle' })
await page.evaluate(() => document.fonts.ready)
await page.screenshot({ path: 'public/og-image.jpg', type: 'jpeg', quality: 88 })
await browser.close()
await server.close()
console.log('public/og-image.jpg')
