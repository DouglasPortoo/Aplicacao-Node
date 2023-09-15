const { Router } = require('express')

const movieNotesControllers = require('../Controllers/MovieNotesControllers')

const ensureAuth = require("../middleware/ensureAuth")

const movieNotesRouter = Router()
movieNotesRouter.use(ensureAuth)

movieNotesRouter.post('/', movieNotesControllers.create)
movieNotesRouter.get('/:id', movieNotesControllers.show)
movieNotesRouter.delete('/:id', movieNotesControllers.delete)
movieNotesRouter.get('/', movieNotesControllers.index)

module.exports = movieNotesRouter