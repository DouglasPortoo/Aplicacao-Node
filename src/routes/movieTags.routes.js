import { Router } from "express";

import { movieTagsControllers } from "../Controllers/MovieTagsControllers"; 

export const movieTagsRouter = Router()

movieTagsRouter.post('/',movieTagsControllers.create)
movieTagsRouter.put('/:user_id',movieTagsControllers.update)
movieTagsRouter.delete('/:id',movieTagsControllers.delete)
movieTagsRouter.get('/:user_id',movieTagsControllers.show)

