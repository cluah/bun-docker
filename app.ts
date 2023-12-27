const PORT: number = +(process.env.PORT || 8081);
const NODE_ENV = process.env.NODE_ENV ?? "development";
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

const server = Bun.serve({
  port: PORT,
  async fetch() {
    const browser = await puppeteer
    .use(StealthPlugin())
    .launch({ headless: 'new' });

  const page = await browser.newPage();
  await page.goto('https://www.diariooficial.interior.gob.cl/');

  try {
    await page.waitForSelector('#tramites', { timeout: 3000 });
    const content = await page.content()

    return new Response(content);
  } catch (err) {
    // await page.screenshot({
    //   path: Date.now() + '.png',
    //   fullPage: true,
    // });

    // throw new Error();
    return new Response(":(");
    // return c.text(':(');
  }

  },
});

console.log(`[${NODE_ENV}] Serving http://localhost:${server.port}`);
