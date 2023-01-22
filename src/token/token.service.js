import jwt from "jsonwebtoken";
import TokenModel from "./token.model.js";
import * as uuid from "uuid";

class TokenService {
    generateJwtTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.SECRET_ACCESS_TOKEN, {expiresIn: '15m'})
        const refreshToken = jwt.sign(payload, process.env.SECRET_REFRESH_TOKEN, {expiresIn: '30d'})
        return {
            accessToken,
            refreshToken
        }
    }

    generateEmailToken() {
        const emailToken = uuid.v4()
        return emailToken
    }

    validateToken(token, secret) {
        jwt.verify(token, secret)
    }

    async saveTokens(userId, refreshToken, emailToken) {
        const result = await TokenModel.create({userId, refreshToken, emailToken})
        return result
    }
}

export default new TokenService