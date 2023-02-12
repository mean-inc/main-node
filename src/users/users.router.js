import {Router} from 'express'
import usersController from "./users.controller.js";
import authMiddleware from "../auth/auth.middleware.js";

const usersRouter = new Router()

usersRouter.put('/settings', authMiddleware, usersController.editUserSettings)

export default usersRouter