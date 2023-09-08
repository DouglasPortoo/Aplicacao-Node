import { Router } from "express";

import multer from "multer";
import { MULTER } from "../configs/upload.js"

import { usersControllers } from "../Controllers/UsersControllers.js";

import  {ensureAuth}  from "../middleware/ensureAuth.js";
import { useAvatarController } from "../Controllers/UserAvatarController.js";

const upload = multer(MULTER)

export const usersRouter = Router()

usersRouter.post('/', usersControllers.create)
usersRouter.put('/',ensureAuth, usersControllers.update)

usersRouter.delete('/',ensureAuth, usersControllers.delete)
usersRouter.get('/',ensureAuth, usersControllers.show)

usersRouter.patch("/avatar",ensureAuth,upload.single('avatar'), useAvatarController.create)
