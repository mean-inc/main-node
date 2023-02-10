import {Router} from "express";
import ordersController from "./orders.controller.js";

const ordersRouter = new Router()

ordersRouter.post('/', ordersController.createOrder)
ordersRouter.get('/', ordersController.getAllOrders)
ordersRouter.get('/:orderId', ordersController.getOrderById)
