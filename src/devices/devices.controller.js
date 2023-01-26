import devicesService from "./devices.service.js";

class DevicesController {

    async getAllDevices(req, res, next) {
        try {
            const {typeId} = req.query
            const devices = await devicesService.getAllDevices(typeId)
            return res.json({success: true, devices})
        } catch (e) {
            return next(e)
        }
    }

    async getDeviceById(req, res, next) {
        try {
            const {id} = req.params
            const device = await devicesService.getDeviceById(id)
            return res.json({success: true, device})
        } catch (e) {
            return next(e)
        }
    }
}

export default new DevicesController()