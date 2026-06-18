import { Request, Response } from "express"
import { generatePdf } from "../services/pdf.service"

export const generatePdfController = async (req: Request, res: Response) => {
  try {
    const { html } = req.body

    if (!html) {
      return res.status(400).json({
        success: false,
        message: "HTML content is required",
      })
    }

    const pdfBuffer = await generatePdf(html)

    res.setHeader("Content-Type", "application/pdf")
    res.setHeader("Content-Disposition", "attachment; filename=document.pdf")

    return res.send(pdfBuffer)
  } catch (error) {
    console.error(error)

    return res.status(500).json({
      success: false,
      message: "Failed to generate PDF",
    })
  }
}
