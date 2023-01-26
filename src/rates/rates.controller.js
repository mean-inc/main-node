import ratesService from "./rates.service.js";
import tokensService from "../tokens/tokens.service.js";

class RatesController {

    async setRating(req, res, next) {
        try {
            const {deviceId} = req.params
            const {rating} = req.body
            const payload = tokensService.getPayloadByReq(req)
            console.log(payload)
            const device = await ratesService.setRating(payload.id, deviceId, rating)
        } catch (e) {
            return next(e)
        }
    }
}

export default new RatesController()