import { Router } from "express"
import { generatePdfController } from "../controllers/pdf.controller"

const pdfRoutes = Router()

pdfRoutes.post("/", generatePdfController)

export default pdfRoutes
