import {ApiError} from "../errors/error.api.js";
import {DevicesModel} from "../devices/devices.model.js";
import {BasketDeviceModel} from "./basket-devices.model.js";
import {BasketsModel} from "./baskets.model.js";

class BasketsService {

    async addDevice(userId, deviceId, amount) {
        const device = await DevicesModel.findOne({where: {id: deviceId}})
        if (!device) {
            throw ApiError.badRequest('Device isn\'t exist')
        }

        let userBasket = await this.getBasketByUserId(userId)
        if (!userBasket) {
            userBasket = await BasketsModel.create({userId})
        }

        let userBasketDevices = await BasketDeviceModel.findOne({where: {deviceId, basketId: userBasket.id}})
        if (!userBasketDevices) {
            userBasketDevices = await BasketDeviceModel.create({
                userId, basketId: userBasket.id, deviceId, amount
            })
            return userBasketDevices
        }
        userBasketDevices.amount = amount
        await userBasketDevices.save()
        return userBasketDevices
    }

    async getBasketDeviceById(deviceId, userId) {
        const basket = await this.getBasketByUserId(userId)
        const basketDevice = await BasketDeviceModel.findOne({where: {deviceId, basketId: basket.id}})
        if (!basketDevice) {
            throw ApiError.badRequest('Device isn\'t exist')
        }
        return basketDevice
    }

    async getAllBasketDevices(userId) {
        const basket = await this.getBasketByUserId(userId)
        const basketDevice = await BasketDeviceModel.findAndCountAll({where: {basketId: basket.id}})
        if (!basketDevice) {
            throw ApiError.badRequest('Devices aren\'t exist')
        }
        return basketDevice
    }

    async getBasketByUserId(userId) {
        const userBasket = await BasketsModel.findOne({where: {userId}})
        return userBasket
    }
}

export default new BasketsService()