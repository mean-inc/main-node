import {Router} from 'express'
import typesController from "./types.controller.js";
import authMiddleware from "../auth/auth.middleware.js";

const typesRouter = new Router()

typesRouter.get('/', authMiddleware, typesController.getAllTypes)

export default typesRouter