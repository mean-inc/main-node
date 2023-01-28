import {DevicesModel} from "../devices/devices.model.js";
import {ApiError} from "../errors/error.api.js";
import {RateDevicesModel} from "./rate-devices.model.js";
import devicesService from "../devices/devices.service.js";

class RatesService {

    async setRating(userId, deviceId, rating) {
        const device = await DevicesModel.findOne({where: {id: deviceId}})
        if (!device) {
            throw ApiError.badRequest(`Don't find device by id: ${deviceId}`)
        }
        rating > 5 ? rating = 5 : rating
        rating < 1 ? rating = 1 : rating

        const isRateDevice = await RateDevicesModel.findOne({where: {userId, deviceId}})
        if (!isRateDevice) {
            const rateDevice = await RateDevicesModel.create({rating, deviceId, userId})
            await devicesService.setAverageRating(deviceId)
            return rateDevice
        }
        isRateDevice.rating = rating
        isRateDevice.save()
        await devicesService.setAverageRating(deviceId)
        return isRateDevice
    }
}

export default new RatesService()