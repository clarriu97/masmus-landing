import { chromium } from 'playwright-core'
import { mkdir } from 'node:fs/promises'

const executablePath = process.env.CHROME_PATH
const base = process.env.URL ?? 'http://localhost:4173'
const label = process.argv[2] ?? 'after'
if (!executablePath) {
  console.error('Set CHROME_PATH to a Chrome or Chromium-based browser binary.')
  process.exit(1)
}

const out = `.screenshots/${label}`
await mkdir(out, { recursive: true })
const browser = await chromium.launch({ executablePath })

async function scrollThrough(page) {
  const height = await page.evaluate(() => document.documentElement.scrollHeight)
  for (let y = 0; y <= height; y += 300) {
    await page.evaluate((top) => window.scrollTo(0, top), y)
    await page.waitForTimeout(60)
  }
  await page.waitForTimeout(800)
  await page.evaluate(() => window.scrollTo(0, 0))
  await page.waitForTimeout(400)
}

async function overflow(page) {
  return page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
}

for (const width of [390, 1280]) {
  for (const reducedMotion of ['no-preference', 'reduce']) {
    const page = await browser.newPage({ viewport: { width, height: width === 390 ? 844 : 800 }, reducedMotion })
    const suffix = reducedMotion === 'reduce' ? '-reduced' : ''
    for (const path of ['/', '/privacy/', '/terms/']) {
      await page.goto(base + path, { waitUntil: 'networkidle' })
      await page.evaluate(() => document.fonts.ready)
      const name = path === '/' ? 'home' : path.replaceAll('/', '')
      if (path === '/' && reducedMotion === 'no-preference') {
        await page.waitForTimeout(1500)
        await page.screenshot({ path: `${out}/hero-${width}.png` })
        const steps = await page.locator('[data-step]').count()
        for (let i = 0; i < steps; i++) {
          await page.locator('[data-step]').nth(i).evaluate((el) => el.scrollIntoView({ block: 'center' }))
          await page.waitForTimeout(900)
          await page.screenshot({ path: `${out}/story-${width}-${i + 1}.png` })
        }
        await page.evaluate(() => window.scrollTo(0, 600))
        await page.waitForTimeout(500)
        await page.screenshot({ path: `${out}/header-scrolled-${width}.png` })
      }
      if (path === '/' || reducedMotion === 'no-preference') {
        await scrollThrough(page)
        await page.screenshot({ path: `${out}/${name}-${width}${suffix}.png`, fullPage: true, animations: 'disabled' })
        console.log(`${name} ${width}${suffix}: horizontal overflow ${await overflow(page)}px`)
      }
    }
    await page.close()
  }
}

await browser.close()
