import { Router } from "express";
import { sessionController } from "../Controllers/SessionController.js"; 

export const sessionRouter = Router()

sessionRouter.post('/', sessionController.create)

