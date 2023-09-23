const { Router } = require('express')

const multer = require('multer')
const uploadConfig = require('../configs/upload')

const usersControllers = require('../Controllers/UsersControllers')

const useAvatarController = require('../Controllers/UserAvatarController')


const upload = multer(uploadConfig.MULTER)

const ensureAuth = require("../middleware/ensureAuth")

const usersRouter = Router()

usersRouter.get('/:id',ensureAuth, usersControllers.show)
usersRouter.post('/', usersControllers.create)
usersRouter.put('/',ensureAuth, usersControllers.update)
usersRouter.patch("/avatar",ensureAuth,upload.single('avatar'), useAvatarController.update)
usersRouter.delete('/',ensureAuth, usersControllers.delete)

module.exports = usersRouter