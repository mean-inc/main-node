import {DevicesModel} from "../devices/devices.model.js";
import {ApiError} from "../errors/error.api.js";
import {RateDevicesModel} from "./rates.model.js";

class RatesService {

    async setRating(userId, deviceId, rating) {
        const device = await DevicesModel.findByPk(deviceId)
        if (!device) {
            throw ApiError.badRequest(`Don't find device by id: ${deviceId}`)
        }
        rating > 5 ? rating = 5 : rating
        rating < 1 ? rating = 1 : rating

        device.rating = rating
        await device.save()
        await RateDevicesModel.create({rating, deviceId, userId})

        return device
    }
}

export default new RatesService()