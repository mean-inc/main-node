import jwt from "jsonwebtoken";
import TokensModel from "./tokens.model.js";
import * as uuid from "uuid";
import tokenModel from "./tokens.model.js";
import {ApiError} from "../errors/error.api.js";
import {UsersDto} from "../users/users.dto.js";
import {UsersModel} from "../users/users.model.js";

class TokensService {
    generateJwtTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.SECRET_ACCESS_TOKEN, {expiresIn: '30d'})
        const refreshToken = jwt.sign(payload, process.env.SECRET_REFRESH_TOKEN, {expiresIn: '30d'})
        return {
            accessToken,
            refreshToken
        }
    }

    async saveTokens(userId, refreshToken, mailToken) {
        const user = await TokensModel.findOne({where: {userId}})
        if (!user) {
            const result = await TokensModel.create({userId, refreshToken, mailToken})
            return result
        }
        user.refreshToken = refreshToken
        await user.save()
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.unAuthorized('Logout successfully!')
        }
        const validToken = this.validateToken(refreshToken, process.env.SECRET_REFRESH_TOKEN)
        const schemaToken = await tokenModel.findOne({where: {refreshToken}})

        if (!validToken || !schemaToken) {
            throw ApiError.unAuthorized('Logout successfully!')
        }
        const user = await UsersModel.findByPk(validToken.id)
        const userDto = new UsersDto(user)
        const tokens = this.generateJwtTokens({...userDto})
        await this.saveTokens(userDto.id, tokens.refreshToken)
        return tokens
    }

    generateMailToken() {
        const emailToken = uuid.v4()
        return emailToken
    }

    validateToken(token, secret) {
        const verified = jwt.verify(token, secret)
        return verified
    }
}

export default new TokensService