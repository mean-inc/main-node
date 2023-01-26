import jwt from "jsonwebtoken";
import TokenModel from "./token.model.js";
import * as uuid from "uuid";
import tokenModel from "./token.model.js";
import {ApiError} from "../errors/error.api.js";
import {UsersDto} from "../users/user.dto.js";
import {UsersModel} from "../users/user.model.js";

class TokenService {
    generateJwtTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.SECRET_ACCESS_TOKEN, {expiresIn: '15m'})
        const refreshToken = jwt.sign(payload, process.env.SECRET_REFRESH_TOKEN, {expiresIn: '30d'})
        return {
            accessToken,
            refreshToken
        }
    }

    async saveTokens(userId, refreshToken, emailToken) {
        const user = await TokenModel.findOne({where: {id: userId}})
        if (!user) {
            const result = await TokenModel.create({userId, refreshToken, emailToken})
            return result
        }
        user.refreshToken = refreshToken
        await user.save()
    }

    async refresh(refreshToken) {
        const validToken = this.validateToken(refreshToken, process.env.SECRET_REFRESH_TOKEN)
        const schemaToken = await tokenModel.findOne({where: {refreshToken}})
        console.log(`schemaToken : ${schemaToken}`)
        if (!validToken || !schemaToken) {
            throw ApiError.unAuthorized('Logout successfully!')
        }
        const user = await UsersModel.findByPk(validToken.id)
        const userDto = new UsersDto(user)
        const tokens = this.generateJwtTokens({...userDto})
        await this.saveTokens(userDto.id, tokens.refreshToken)
        return tokens
    }

    generateEmailToken() {
        const emailToken = uuid.v4()
        return emailToken
    }

    validateToken(token, secret) {
        const verified = jwt.verify(token, secret)
        return verified
    }
}

export default new TokenService