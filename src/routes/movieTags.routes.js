import { Router } from "express";

import { movieTagsControllers } from "../Controllers/MovieTagsControllers.js"; 
import  {ensureAuth}  from "../middleware/ensureAuth.js";

export const movieTagsRouter = Router()

movieTagsRouter.get('/',ensureAuth,movieTagsControllers.index)

