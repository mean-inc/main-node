import ratesService from "./rates.service.js";
import tokensService from "../tokens/tokens.service.js";

class RatesController {

    async setRating(req, res, next) {
        try {
            const {deviceId} = req.params
            const {rating} = req.body
            const token = req.headers.authorization.split(' ')[1]
            const payload = tokensService.validateToken(token, process.env.SECRET_ACCESS_TOKEN)
            const device = await ratesService.setRating(payload.id, deviceId, rating)
            return res.json({device})
        } catch (e) {
            return next(e)
        }
    }
}

export default new RatesController()