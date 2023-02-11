import {UsersModel} from '../users/users.model.js'
import {ApiError} from "../errors/error.api.js";
import bcrypt from 'bcrypt'
import tokenService from "../tokens/tokens.service.js";
import {UsersDto} from "../users/users.dto.js";
import TokensModel from "../tokens/tokens.model.js";
import {BasketsModel} from "../baskets/baskets.model.js";
import mailsService from "../mails/mails.service.js";

class AuthService {
    async signUp(name, surname, email, phone, password) {
        const isExistUser = await UsersModel.findOne({where: {email}})
        if (isExistUser) {
            throw ApiError.badRequest('The user with this email exists')
        }
        const hashPassword = bcrypt.hashSync(password, 10)
        const user = await UsersModel.create({
            name, surname, email, phone, password: hashPassword
        })

        user.basketId = basket.id
        await user.save()

        const userDto = new UsersDto(user)

        const {accessToken, refreshToken} = tokenService.generateJwtTokens({...userDto})
        const mailToken = tokenService.generateMailToken()
        const link = process.env.API_DOMAIN + 'api/mails/' + mailToken
        await mailsService.sendActivateMail(email, link)

        await tokenService.saveTokens(user.id, refreshToken, mailToken)
        return {accessToken, refreshToken, user}
    }

    async signIn(email, password) {
        const user = await UsersModel.findOne({where: {email}})
        if (!user) {
            throw ApiError.badRequest('The user isn\'t exist with this email')
        }
        const isEqualPassword = bcrypt.compareSync(password, user.password)
        if (!isEqualPassword) {
            throw ApiError.badRequest('Don\'t correct password')
        }
        const userDto = new UsersDto(user)
        const {accessToken, refreshToken} = tokenService.generateJwtTokens({...userDto})
        await tokenService.saveTokens(user.id, refreshToken)

        return {accessToken, refreshToken, user}
    }

    async logout(refreshToken) {
        // const user = await UsersModel.findOne({where: {email}})
        const token = await TokensModel.findOne({where: {refreshToken}})
        if (!token) {
            throw ApiError.unAuthorized('Logout successfully')
        }
        token.refreshToken = null
        await token.save()
    }
}

export default new AuthService()