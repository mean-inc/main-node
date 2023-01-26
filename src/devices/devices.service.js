import {DevicesModel} from "./devices.model.js";

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
}

export default new DevicesService()