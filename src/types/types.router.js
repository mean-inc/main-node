import {Router} from 'express'
import typesController from "./types.controller.js";

const typesRouter = new Router()

typesRouter.get('/', typesController.getAllTypes)