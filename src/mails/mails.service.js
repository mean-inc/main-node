import nodemailer from "nodemailer";
import TokensModel from "../tokens/tokens.model.js";
import {ApiError} from "../errors/error.api.js";
import {UsersModel} from "../users/users.model.js";

class MailsService {
    constructor() {
        console.log('constructor')
        this.transport = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            secure: false,
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
            subject: '',
            html:
                `
                <div>
                    <h1>Активация почты. Перейдите по ссылке: <a href="${link}">${link}</a> </h1>
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

        const mailToken = await TokensModel.findOne({where: {userId: user.id}})
        if (!mailToken) {
            throw ApiError.badRequest('Incorrect link')
        }

        const link = process.env.API_DOMAIN + `mail/activate/${mailToken}`
        return link
    }
}

export default new MailsService()