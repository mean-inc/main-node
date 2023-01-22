import userModel from '../user/user.model.js'
import {ApiError} from "../exceptions/index.js";
import bcrypt from 'bcrypt'
import tokenService from "../token/token.service.js";

class AuthService {
    async signUp(name, surname, email, phone, password) {
        const isExistUser = await userModel.findOne({where: {email}})
        if (isExistUser) {
            return ApiError.badRequest('The user with this email exists')
        }
        const hashPassword = bcrypt.hashSync(password, 10)
        const {accessToken, refreshToken} = tokenService.generateJwtTokens({name, surname, email})
        const emailToken = tokenService.generateEmailToken()
        const user = await userModel.create({
            name, surname, email, phone, password: hashPassword
        })
        await tokenService.saveTokens(user.id, refreshToken, emailToken)
        return {accessToken, user}
    }

    async signIn(email, password) {
        const isExistUser = await userModel.findOne({where: {email}})
        if (!isExistUser) {
            return ApiError.badRequest('The user isn\'t exist with this email')
        }
        const isEqualPassword = bcrypt.compareSync(password, isExistUser.password)
        if (!isEqualPassword) {
            return ApiError.badRequest('Don\'t correct password')
        }
        const tokens = this.generateTokens()
    }
}

export default new AuthService()