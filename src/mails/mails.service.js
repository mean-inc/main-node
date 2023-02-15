import nodemailer from "nodemailer";
import TokensModel from "../tokens/tokens.model.js";
import {ApiError} from "../errors/error.api.js";
import {UsersModel} from "../users/users.model.js";
import dotenv from 'dotenv'
import tokensService from "../tokens/tokens.service.js";
import {UsersDto} from "../users/users.dto.js";
dotenv.config()

class MailsService {
    constructor() {
        console.log('constructor')
        this.transport = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            auth: {
                user: process.env.MAIL_LOGIN,
                pass: process.env.MAIL_PASSWORD,
            }
        })
    }

    async sendActivateMail(to, link) {
        await this.transport.sendMail({
            from: process.env.MAIL_LOGIN,
            to,
            subject: 'Activate mail',
            html:
                `
                <div>
                    <h1>Активация почты. Перейдите по ссылке:</h1>
                    <a href="${link}">${link}</a>
                </div>
            `
        })
    }

    async activateMail(link) {
        const mailToken = await TokensModel.findOne({where: {mailToken: link}})
        if (!mailToken) {
            throw ApiError.badRequest('Incorrect link')
        }
        const user = await UsersModel.findByPk(mailToken.userId)
        if (!user) {
            throw ApiError.forbidden('Don\'t find user')
        }
        user.isActivate = true
        await user.save()
        return user
    }

    async getActivateLinkByEmail(email) {
        const user = await UsersModel.findOne({where: {email}})
        if (!user) {
            throw ApiError.badRequest('Don\'t find user')
        }

        const tokens = await TokensModel.findOne({where: {userId: user.id}})
        if (tokens) {
            const link = process.env.API_DOMAIN + `api/mails/activate/${tokens.mailToken}`
            return link
        }

        const userDto = new UsersDto(user)
        const jwtTokens = tokensService.generateJwtTokens(...userDto)
        const mailToken = tokensService.generateMailToken()
        await TokensModel.create({
            accessToken: jwtTokens.accessToken, refreshToken: jwtTokens.refreshToken, mailToken
        })
        const link = process.env.API_DOMAIN + `api/mails/activate/${tokens.mailToken}`

        return link
    }
}

export default new MailsService()