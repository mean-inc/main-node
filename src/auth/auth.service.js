import {UsersModel} from '../users/user.model.js'
import {ApiError} from "../errors/error.api.js";
import bcrypt from 'bcrypt'
import tokenService from "../token/token.service.js";
import {UsersDto} from "../users/user.dto.js";
import TokenModel from "../token/token.model.js";

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
        const userDto = new UsersDto(user)

        const {accessToken, refreshToken} = tokenService.generateJwtTokens({...userDto})
        const emailToken = tokenService.generateEmailToken()

        await tokenService.saveTokens(user.id, refreshToken, emailToken)
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

    async logout(email) {
        const user = await UsersModel.findOne({where: {email}})
        const token = await TokenModel.findOne({where: {userId: user.id}})
        if (!user || !token) {
            throw ApiError.unAuthorized('Logout successfully')
        }
        token.refreshToken = null
        await token.save()
    }
}

export default new AuthService()