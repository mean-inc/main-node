import {Router} from 'express'
import basketsController from "./baskets.controller.js";
import authMiddleware from "../auth/auth.middleware.js";

const basketsRouter = new Router()

basketsRouter.post('/', authMiddleware, basketsController.addDevice)
basketsRouter.get('/:deviceId', authMiddleware, basketsController.getOneDevice)
basketsRouter.get('/', authMiddleware, basketsController.getAllDevice)
basketsRouter.delete('/:deviceId', authMiddleware, basketsController.removeDeviceFromBasket)

export default basketsRouter