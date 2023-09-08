import { Router } from "express";
import { usersControllers } from "../Controllers/UsersControllers.js";
import { notesControllers } from "../Controllers/NotesControllers.js";
import { tagsControllers } from "../Controllers/MovieTagsControllers.js";

export const usersRouter = Router()
export const notesRouter = Router()
export const tagsRouter = Router()

usersRouter.post('/',usersControllers.create)
usersRouter.put('/:user_id',usersControllers.update)
usersRouter.delete('/:id',usersControllers.delete)
usersRouter.get('/:user_id',usersControllers.show)

notesRouter.post('/',notesControllers.create)
notesRouter.put('/:user_id',notesControllers.update)
notesRouter.delete('/:id',notesControllers.delete)
notesRouter.get('/:user_id',notesControllers.show)

tagsRouter.post('/',tagsControllers.create)
tagsRouter.put('/:user_id',tagsControllers.update)
tagsRouter.delete('/:id',tagsControllers.delete)
tagsRouter.get('/:user_id',tagsControllers.show)