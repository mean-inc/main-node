import {ApiError} from "../errors/error.api.js";
import {DevicesModel} from "../devices/devices.model.js";
import {BasketDeviceModel} from "./basket-devices.model.js";
import {BasketsModel} from "./baskets.model.js";
import usersService from "../users/users.service.js";

class BasketsService {

    async createBasketByUserId(userId) {
        const user = await usersService.findUserById(userId)
        if (!user)
            throw ApiError.forbidden('')
        const basket = await BasketsModel.create({userId})
        return basket
    }

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

    async removeDeviceFromBasket(userId, deviceId) {
        const basket = await this.getBasketByUserId(userId)
        const isExistDevice = await BasketDeviceModel.findOne({where: {deviceId, basketId: basket.id}})
        if (!isExistDevice)
            throw ApiError.badRequest('Device isn\'t exist')
        const device = await BasketDeviceModel.destroy({where: {deviceId, basketId: basket.id}})
        return device
    }

    async clearBasket(userId) {
        const user = await usersService.findUserById(userId)
        if (!user) {
            throw ApiError.forbidden()
        }

        let basket = await this.getBasketByUserId(userId)
        if (!basket) {
            basket = await this.createBasketByUserId(userId)
        }

        const basketDevice = await BasketDeviceModel.findAll({where: {basketId: basket.id}})
        if (!basketDevice) {
            throw ApiError.badRequest('Basket is empty')
        }

        await BasketDeviceModel.destroy({where: {basketId: basket.id}})
    }
}

export default new BasketsService()