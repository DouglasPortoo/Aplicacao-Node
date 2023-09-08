import { Router } from "express";

import { movieNotesControllers } from "../Controllers/MovieNotesControllers.js"; 

export const movieNotesRouter = Router()

movieNotesRouter.post('/:user_id',movieNotesControllers.create)
// movieNotesRouter.put('/:user_id',movieNotesControllers.update)
// movieNotesRouter.delete('/:id',movieNotesControllers.delete)
movieNotesRouter.get('/:id',movieNotesControllers.show)

