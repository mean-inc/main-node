import {DevicesModel} from "./devices.model.js";
import ratesService from "../rates/rates.service.js";
import scheme from "../../database/scheme.js";
import {QueryTypes} from "sequelize";

class DevicesService {

    async getAllDevices(typeId) {
        if (typeId) {
            const devices = await DevicesModel.findAll({where: {typeId}})
            return devices
        }
        const devices = await DevicesModel.findAll()
        return devices
    }

    async getDeviceById(id) {
        const device = await DevicesModel.findByPk(id)
        return device
    }

    async setAverageRating(deviceId) {
        const device = await DevicesModel.findOne({where: {id: deviceId}})
        const averageRateOfDevice = await scheme.query(
            `SELECT AVG(rating) as average FROM rate_devices 
                    WHERE deviceId = ${deviceId}`, {
                raw: true,
                type: QueryTypes.SELECT
            })
        device.rating = averageRateOfDevice[0].average
        await device.save()
        return device
    }
}

export default new DevicesService()