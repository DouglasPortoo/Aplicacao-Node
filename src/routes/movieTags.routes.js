import { Router } from "express";

import { movieTagsControllers } from "../Controllers/MovieTagsControllers.js"; 

export const movieTagsRouter = Router()

movieTagsRouter.get('/:user_id',movieTagsControllers.index)

