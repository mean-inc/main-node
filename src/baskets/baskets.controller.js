import basketsService from "./baskets.service.js";
import tokensService from "../tokens/tokens.service.js";
import {ApiError} from "../errors/error.api.js";

class BasketsController {

    async addDevice(req, res, next) {
        try {
            let {deviceId, amount} = req.body
            !amount ? amount = 1 : amount
            amount < 0 ? amount = 1 : amount
            if (!deviceId) {
                throw ApiError.badRequest('Please, enter the field deviceId')
            }
            const token = req.headers.authorization.split(' ')[1]
            const user = tokensService.validateToken(token, process.env.SECRET_ACCESS_TOKEN)
            const devices = await basketsService.addDevice(user.id, deviceId, amount)
            return res.json({devices})
        } catch (e) {
            return next(e)
        }
    }

    async getOneDevice(req, res, next) {
        try {
            const {deviceId} = req.params
            const token = req.headers.authorization.split(' ')[1]
            const user = tokensService.validateToken(token, process.env.SECRET_ACCESS_TOKEN)
            const basketDevice = await basketsService.getBasketDeviceById(deviceId, user.id)
            return res.json({success: true, basketDevice})
        } catch (e) {
            next(e)
        }
    }

    async getAllDevice(req, res, next) {
        try {
            const token = req.headers.authorization.split(' ')[1]
            const user = tokensService.validateToken(token, process.env.SECRET_ACCESS_TOKEN)
            const basketDevices = await basketsService.getAllBasketDevices(user.id)
            return res.json({success: true, basketDevices})
        } catch (e) {
            next(e)
        }
    }

    async removeDeviceFromBasket(req, res, next) {
        try {
            const {deviceId} = req.params
            const token = req.headers.authorization.split(' ')[1]
            const user = tokensService.validateToken(token, process.env.SECRET_ACCESS_TOKEN)
            const removeDevice = await basketsService.removeDeviceFromBasket(user.id, deviceId)
            return res.json({success: true, message: 'Device was removed', removeDevice})
        } catch (e) {
            next(e)
        }
    }
}

export default new BasketsController()