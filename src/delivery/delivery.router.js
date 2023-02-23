import DeliveryController from "./delivery.controller.js";
import {Router} from "express";

const deliveryRouter = new Router()

deliveryRouter.get('/', DeliveryController.getDeliveries)
deliveryRouter.get('/:id', DeliveryController.getDeliveryById)

export default deliveryRouter