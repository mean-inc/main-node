import tokensService from "../tokens/tokens.service.js";
import ordersService from "./orders.service.js";

class OrdersController {

    async createOrder(req, res, next) {
        try {
            const {deliveryTypeId} = req.body
            const token = req.headers.authorization.split(' ')[1]
            const user = await tokensService.validateToken(token, process.env.SECRET_ACCESS_TOKEN)
            const order = await ordersService.createOrder(user.id, deliveryTypeId)
            return res.json({order})
        } catch(e) {
            next(e)
        }
    }

    async getAllOrders(req, res, next) {
        try {
            const token = req.headers.authorization.split(' ')[1]
            const user = await tokensService.validateToken(token, process.env.SECRET_ACCESS_TOKEN)
            const orders = await ordersService.getAllOrders(user.id)
            return res.json({orders})
        } catch(e) {
            next(e)
        }
    }


    async getOrderById(req, res, next) {
        try {
            const {orderId} = req.params
            const token = req.headers.authorization.split(' ')[1]
            const user = await tokensService.validateToken(token, process.env.SECRET_ACCESS_TOKEN)
            const order = await ordersService.getOrderById(user.id, orderId)
            return res.json({order})
        } catch(e) {
            next(e)
        }
    }

    async payment(req, res, next) {
        try {
            const {orderId} = req.params
            const token = req.headers.authorization.split(' ')[1]
            const user = await tokensService.validateToken(token, process.env.SECRET_ACCESS_TOKEN)
            const payment = await ordersService.payment(user.id, orderId)

            return res.json({success: true, payment})
        } catch (e) {
            next(e)
        }
    }
}

export default new OrdersController()