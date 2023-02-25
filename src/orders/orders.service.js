import {OrdersModel} from "./orders.model.js";
import basketsService from "../baskets/baskets.service.js";
import {BasketDeviceModel} from "../baskets/basket-devices.model.js";
import {ApiError} from "../errors/error.api.js";
import scheme from "../../database/scheme.js";
import {QueryTypes} from "sequelize";
import {OrderDevicesModel} from "./order-devices.model.js";

class OrdersService {

    async getAllOrders(userId) {
        const basket = await basketsService.getBasketByUserId(userId)
        const orders = await OrdersModel.findAll({where: {basketId: basket.id}})
        return orders
    }

    async getOrderById(userId, orderId) {
        const basket = await basketsService.getBasketByUserId(userId)
        const order = await OrdersModel.findOne({where: {basketId: basket.id, id: orderId}})
        return order
    }

    async createOrder(userId, deliveryTypeId) {
        const basket = await basketsService.getBasketByUserId(userId)
        const basketDevices = await BasketDeviceModel.findAll({where: {basketId: basket.id}})
        if (!basketDevices.length) {
            throw ApiError.badRequest('Basket is empty')
        }
        if (!deliveryTypeId) {
            throw ApiError.badRequest('Field \'deliveryTypeId\' is require')
        }
        let orderDevices = await scheme.query(`
            SELECT devices.price as price, devices.id as deviceId, basket_devices.basketId as basketId, basket_devices.amount as amount
            FROM basket_devices
            LEFT JOIN devices ON basket_devices.deviceId = devices.id
            WHERE basket_devices.basketId = ${basket.id}
        `, {
            type: QueryTypes.SELECT,
            raw: true
        })
        const order = await OrdersModel.create({basketId: basket.id, orderStatusId: 1, deliveryTypeId})
        for (const orderDevice of orderDevices) {
            await OrderDevicesModel.create({
                price: orderDevice.price,
                deviceId: orderDevice.deviceId,
                basketId: orderDevice.basketId,
                amount: orderDevice.amount,
                orderId: order.id,
                sum: orderDevice.price * orderDevice.amount,
            })
        }

        await basketsService.clearBasket(userId)
        return order
    }

    async payment(userId, orderId) {
        const order = await this.getOrderById(userId, orderId)
        if (!order)
            throw ApiError.badRequest('Order don\'t exist')

        if (!order.isPaid)
            order.isPaid = true
        else
            throw ApiError.badRequest('This order has a payment')

        await order.save()
        return order
    }
}

export default new OrdersService()