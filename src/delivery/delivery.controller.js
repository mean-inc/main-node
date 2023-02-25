import {DeliveryTypesModel} from "./delivery-types.model.js";

class DeliveryController {

    async getDeliveries(req, res, next) {
        try {
            const deliveries = await DeliveryTypesModel.findAll()
            return res.json({deliveries})
        } catch (e) {
            next(e)
        }
    }

    async getDeliveryById(req, res, next) {
        try {
            const {id} = req.params
            const delivery = await DeliveryTypesModel.findByPk(id)
            return res.json({delivery})
        } catch (e) {
            next(e)
        }
    }
}

export default new DeliveryController()