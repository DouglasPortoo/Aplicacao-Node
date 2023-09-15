import * as env from "dotenv/config.js"
import { routes } from "./routes/index.js";
import express from 'express'
import { UPLOADS_FOLDER } from "./configs/upload.js";
import cors from "cors"

const app = express()
const PORT = process.env.PORT || 3333

app.listen(PORT, () => console.log("ON", PORT))
app.use(express.json())
app.use(cors())
app.use("/files",express.static(UPLOADS_FOLDER))
app.use(routes)