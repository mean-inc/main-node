import {Router} from 'express'
import ratesController from "./rates.controller.js";
import authMiddleware from "../auth/auth.middleware.js";

const ratesRouter = new Router()

ratesRouter.post('/:deviceId', authMiddleware, ratesController.setRating)

export default ratesRouter