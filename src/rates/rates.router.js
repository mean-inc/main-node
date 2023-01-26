import {Router} from 'express'
import ratesController from "./rates.controller.js";

const ratesRouter = new Router()

ratesRouter.post('/:deviceId', ratesController.setRating)
// ratesRouter.get('/:id', ratesController.getRatingOfDevice)

export default ratesRouter