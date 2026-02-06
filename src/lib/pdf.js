import puppeteer from "puppeteer";
import puppeteerCore from "puppeteer-core";
import chromium from "@sparticuz/chromium";


const isServerless = !!process.env.VERCEL || !!process.env.AWS_LAMBDA_FUNCTION_NAME;

export async function generatePDF(htmlContent) {
  let browser;

  try {
    if (isServerless) {
      // ✅ Vercel / Lambda
      let executablePath = await chromium.executablePath();

      // Fallback for Vercel builds
      if (!executablePath || executablePath.includes("undefined")) {
        try {
          const chromiumMin = (await import("@sparticuz/chromium-min")).default;
          executablePath = await chromiumMin.executablePath();
        } catch (e) {
          console.warn("Fallback to chromium-min failed, using default path");
        }
      }

      browser = await puppeteerCore.launch({
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: executablePath,
        headless: chromium.headless,
      });
    } else {
      // ✅ Localhost (Windows / Mac / Linux)
      browser = await puppeteer.launch({
        headless: "new",
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      });
    }

    const page = await browser.newPage();

    await page.setContent(htmlContent, {
      waitUntil: "networkidle0",
    });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: "15mm",
        right: "15mm",
        bottom: "15mm",
        left: "15mm",
      },
    });

    return pdfBuffer;
  } catch (error) {
    console.error("Error generating PDF:", error);
    throw error;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}
