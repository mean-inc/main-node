import {Router} from 'express'
import ratesController from "./rates.controller.js";

const ratesRouter = new Router()

ratesRouter.post('/:deviceId', ratesController.setRating)

export default ratesRouter