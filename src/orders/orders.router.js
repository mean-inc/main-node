import {Router} from "express";
import ordersController from "./orders.controller.js";
import authMiddleware from "../auth/auth.middleware.js";

const ordersRouter = new Router()

ordersRouter.post('/', authMiddleware, ordersController.createOrder)
ordersRouter.get('/', authMiddleware, ordersController.getAllOrders)
ordersRouter.get('/:orderId', authMiddleware, ordersController.getOrderById)
ordersRouter.put('/payment/:orderId', authMiddleware, ordersController.payment) // emulation

export default ordersRouter