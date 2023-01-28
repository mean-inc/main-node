import {Router} from 'express'
import basketsController from "./baskets.controller.js";

const basketsRouter = new Router()

basketsRouter.post('/', basketsController.addDevice)
basketsRouter.get('/:deviceId', basketsController.getOneDevice)
basketsRouter.get('/', basketsController.getAllDevice)

export default basketsRouter