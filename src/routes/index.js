import { Router } from "express";
import { notesRouter, tagsRouter, usersRouter } from "./users.routes.js";

export const routes = Router()

routes.use("/users",usersRouter )
routes.use("/notes",notesRouter )
routes.use("/tags",tagsRouter )