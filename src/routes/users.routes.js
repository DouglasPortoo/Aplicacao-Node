import { Router } from "express";
import { usersControllers } from "../Controllers/UsersControllers.js";

export const usersRouter = Router()

usersRouter.post('/', usersControllers.create)
usersRouter.put('/:user_id', usersControllers.update)
usersRouter.delete('/:id', usersControllers.delete)
usersRouter.get('/:user_id', usersControllers.show)
