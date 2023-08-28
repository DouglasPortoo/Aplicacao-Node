import { Router } from "express";
import { usersControllers } from "../Controllers/UsersControllers.js";

export const usersRouter = Router()

usersRouter.post('/',usersControllers.create)