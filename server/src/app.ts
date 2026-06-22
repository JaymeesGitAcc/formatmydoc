import express from "express"
import cors from "cors"
import pdfRoutes from "./routes/pdf.routes"
import visionRoutes from "./routes/vision.routes"

const app = express()

app.use(cors({
  origin: ["http://localhost:5173"],
  credentials: true
}))
app.use(express.json())

app.get("/", (_req, res) => {
  res.send("FormatMyDoc API running")
})

app.use("/api/pdf", pdfRoutes)
app.use("/api/vision", visionRoutes)

export default app
