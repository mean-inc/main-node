import {Router} from 'express'
import devicesController from "./devices.controller.js";
import authMiddleware from "../auth/auth.middleware.js";

const devicesRouter = new Router()

devicesRouter.get('/', authMiddleware, devicesController.getAllDevices)
devicesRouter.get('/:id', authMiddleware, devicesController.getDeviceById)

export default devicesRouter