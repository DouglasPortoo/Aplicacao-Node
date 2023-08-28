import  Express  from "express";

const app = Express()
const PORT = 3333

app.listen(PORT, ()=> console.log("ON"))
app.use(Express.json())
app.use(routes)