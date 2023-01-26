import {Router} from 'express'
import devicesController from "./devices.controller.js";

const devicesRouter = new Router()

devicesRouter.get('/', devicesController.getAllDevices)
devicesRouter.get('/:id', devicesController.getDeviceById)

export default devicesRouter