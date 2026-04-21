import puppeteer from "puppeteer";
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";

const htmlPath = resolve("index.html");
const outPath = resolve("cv.pdf");

const browser = await puppeteer.launch({
  headless: "new",
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});

try {
  const page = await browser.newPage();
  await page.emulateMediaType("print");
  await page.goto(pathToFileURL(htmlPath).href, { waitUntil: "networkidle0" });
  await page.pdf({
    path: outPath,
    format: "A4",
    printBackground: true,
    preferCSSPageSize: true,
    margin: { top: "16mm", right: "14mm", bottom: "16mm", left: "14mm" },
  });
  console.log(`Wrote ${outPath}`);
} finally {
  await browser.close();
}
