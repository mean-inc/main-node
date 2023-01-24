import {UserModel} from '../user/user.model.js'
import {ApiError} from "../error/index.js";
import bcrypt from 'bcrypt'
import tokenService from "../token/token.service.js";
import {UserDto} from "../user/user.dto.js";
import TokenModel from "../token/token.model.js";

class AuthService {
    async signUp(name, surname, email, phone, password) {
        const isExistUser = await UserModel.findOne({where: {email}})
        if (isExistUser) {
            throw ApiError.badRequest('The user with this email exists')
        }
        const hashPassword = bcrypt.hashSync(password, 10)
        const user = await UserModel.create({
            name, surname, email, phone, password: hashPassword
        })
        const userDto = new UserDto(user)

        const {accessToken, refreshToken} = tokenService.generateJwtTokens({...userDto})
        const emailToken = tokenService.generateEmailToken()

        await tokenService.saveTokens(user.id, refreshToken, emailToken)
        return {accessToken, refreshToken, user}
    }

    async signIn(email, password) {
        const user = await UserModel.findOne({where: {email}})
        if (!user) {
            throw ApiError.badRequest('The user isn\'t exist with this email')
        }
        const isEqualPassword = bcrypt.compareSync(password, user.password)
        if (!isEqualPassword) {
            throw ApiError.badRequest('Don\'t correct password')
        }
        const userDto = new UserDto(user)
        const {accessToken, refreshToken} = tokenService.generateJwtTokens({...userDto})
        await tokenService.saveTokens(user.id, refreshToken)

        return {accessToken, refreshToken, isExistUser: user}

    }

    async logout(email) {
        const user = await UserModel.findOne({where: {email}})
        const token = await TokenModel.findOne({where: {userId: user.id}})
        token.refreshtoken = null
        await token.save()
    }

    async refresh() {

    }
}

export default new AuthService()