import { Router } from "express";

import { movieNotesControllers } from "../Controllers/MovieNotesControllers.js";
import  {ensureAuth}  from "../middleware/ensureAuth.js";

export const movieNotesRouter = Router()

movieNotesRouter.use(ensureAuth)

movieNotesRouter.post('/', movieNotesControllers.create)
movieNotesRouter.get('/:id', movieNotesControllers.show)
movieNotesRouter.delete('/:id', movieNotesControllers.delete)
movieNotesRouter.get('/', movieNotesControllers.index)

