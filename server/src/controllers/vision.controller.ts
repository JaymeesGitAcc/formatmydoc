import { Request, Response } from "express"
import {
  extractTextFromImage,
  generateHtmlFromImage,
} from "../services/groqVision.service"

export const extractText = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      })
    }

    const imageBase64 = req.file.buffer.toString("base64")

    const result = await extractTextFromImage(imageBase64, req.file.mimetype)

    return res.status(200).json({
      success: true,
      text: result,
    })
  } catch (error) {
    console.error(error)

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    })
  }
}

export const generateHtml = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      })
    }

    const imageBase64 = req.file.buffer.toString("base64")

    const html = await generateHtmlFromImage(imageBase64, req.file.mimetype)

    return res.status(200).json({
      success: true,
      html,
    })
  } catch (error) {
    console.error(error)

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    })
  }
}
