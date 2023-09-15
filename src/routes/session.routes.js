const { Router } = require('express')

const sessionController = require('../Controllers/SessionController')


const sessionRouter = Router()

sessionRouter.post('/', sessionController.create)

module.exports = sessionRouter