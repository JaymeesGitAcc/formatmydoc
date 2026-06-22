import puppeteer from "puppeteer"
import { pdfStyles } from "../styles/pdf.styles"

export const generatePdf = async (html: string) => {
  const browser = await puppeteer.launch()

  const page = await browser.newPage()

  const completeHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          ${pdfStyles}
        </style>
      </head>

      <body>
        ${html}
      </body>
    </html>
  `

  await page.setContent(completeHtml, {
    waitUntil: "domcontentloaded",
  })

  const pdf = await page.pdf({
    format: "A4",
    printBackground: true,
    margin: {
      top: "15mm",
      right: "15mm",
      bottom: "15mm",
      left: "15mm",
    },
  })

  await browser.close()

  return pdf
}
