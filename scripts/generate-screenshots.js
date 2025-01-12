import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function generateScreenshots() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const url = 'http://localhost:3000';

  // Desktop Screenshots
  await page.setViewport({ width: 1280, height: 720 });
  await page.goto(url, { waitUntil: 'networkidle0' });
  await page.screenshot({
    path: join(__dirname, '../public/screenshots/desktop-1.png'),
    fullPage: false
  });

  // Scroll down for features
  await page.evaluate(() => window.scrollTo(0, 400));
  await page.screenshot({
    path: join(__dirname, '../public/screenshots/desktop-2.png'),
    fullPage: false
  });

  // Mobile Screenshots
  await page.setViewport({ width: 375, height: 667, deviceScaleFactor: 2 });
  await page.goto(url, { waitUntil: 'networkidle0' });
  await page.screenshot({
    path: join(__dirname, '../public/screenshots/mobile-1.png'),
    fullPage: false
  });

  // Scroll down for features
  await page.evaluate(() => window.scrollTo(0, 400));
  await page.screenshot({
    path: join(__dirname, '../public/screenshots/mobile-2.png'),
    fullPage: false
  });

  await browser.close();
  console.log('Screenshots generated successfully!');
}

generateScreenshots().catch(console.error);
