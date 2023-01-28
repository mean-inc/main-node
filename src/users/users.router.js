import {Router} from 'express'
import usersController from "./users.controller.js";

const usersRouter = new Router()

usersRouter.put('/settings', usersController.editUserSettings)

export default usersRouter