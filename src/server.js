import Express from "express";
import { routes } from "./routes/index.js";

const app = Express()
const PORT = 3333

app.listen(PORT, () => console.log("ON"))
app.use(Express.json())
app.use(routes)