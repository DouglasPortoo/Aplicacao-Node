require("dotenv/config")

const express = require('express')
const routes = require('./routes')

const cors = require("cors")

const uploadConfig = require('./configs/upload')

const app = express()
app.use(cors())

app.use(express.json())

app.use("/files",express.static(uploadConfig.UPLOADS_FOLDER))

app.use(routes)

const PORT = process.env.PORT || 3333
app.listen(PORT, () => console.log("ON", PORT))