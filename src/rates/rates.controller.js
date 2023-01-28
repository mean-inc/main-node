import ratesService from "./rates.service.js";
import tokensService from "../tokens/tokens.service.js";
import {ApiError} from "../errors/error.api.js";

class RatesController {

    async setRating(req, res, next) {
        try {
            const {deviceId} = req.params
            const {rating} = req.body
            if (!deviceId || !rating) {
                throw ApiError.badRequest('Please enter fields: deviceId and rating')
            }
            const token = req.headers.authorization.split(' ')[1]
            const payload = tokensService.validateToken(token, process.env.SECRET_ACCESS_TOKEN)
            const rate = await ratesService.setRating(payload.id, deviceId, rating)
            return res.json({rate})
        } catch (e) {
            return next(e)
        }
    }
}

export default new RatesController()