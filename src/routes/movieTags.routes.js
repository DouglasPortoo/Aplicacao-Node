const { Router } = require('express')

const movieTagsControllers = require('../Controllers/MovieTagsControllers')

const ensureAuth = require("../middleware/ensureAuth")

const movieTagsRouter = Router()

movieTagsRouter.get('/',ensureAuth,movieTagsControllers.index)

module.exports = movieTagsRouter