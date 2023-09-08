import { Router } from "express";

import { usersRouter } from "./users.routes.js";
import { movieNotesRouter } from "./movieNotes.routes.js";
import { movieTagsRouter } from "./movieTags.routes.js";

export const routes = Router()

routes.use("/users", usersRouter)
routes.use("/notes", movieNotesRouter)
routes.use("/tags", movieTagsRouter)