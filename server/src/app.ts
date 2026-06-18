import express from "express"
import cors from "cors"
import pdfRoutes from "./routes/pdf.routes"

const app = express()

app.use(cors())
app.use(express.json())

app.get("/", (_req, res) => {
  res.send("FormatMyDoc API running")
})

app.use("/api/pdf", pdfRoutes)

export default app
