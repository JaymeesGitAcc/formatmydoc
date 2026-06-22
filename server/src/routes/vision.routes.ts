import { Router } from "express"
import { upload } from "../middlewares/upload.middleware"
import { extractText, generateHtml } from "../controllers/vision.controller"

const visionRoutes = Router()

visionRoutes.post("/extract", upload.single("image"), extractText)
visionRoutes.post("/html", upload.single("image"), generateHtml)

export default visionRoutes
