import puppeteer from "puppeteer"
import { editorStyles } from "../styles/editorStyles"

export const generatePdf = async (html: string) => {
  const browser = await puppeteer.launch()

  const page = await browser.newPage()

  const completeHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          ${editorStyles}
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
  })

  await browser.close()

  return pdf
}
