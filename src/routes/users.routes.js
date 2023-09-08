import { Router } from "express";
import { usersControllers } from "../Controllers/UsersControllers.js";

import  {ensureAuth}  from "../middleware/ensureAuth.js";

export const usersRouter = Router()

usersRouter.post('/', usersControllers.create)
usersRouter.put('/',ensureAuth, usersControllers.update)

usersRouter.delete('/',ensureAuth, usersControllers.delete)
usersRouter.get('/',ensureAuth, usersControllers.show)
