import mailsService from "./mails.service.js";
import {UsersModel} from "../users/users.model.js";
import TokensModel from "../tokens/tokens.model.js";
import {ApiError} from "../errors/error.api.js";

class MailsController {

    async sendMail(req, res, next) {
        try {
            const {email} = req.body
            const link = await mailsService.getActivateLinkByEmail(email)
            const mail = await mailsService.sendActivateMail(email, link)
            return res.json({mail})
        } catch(e) {
            next(e)
        }
    }

    async activateAccount(req, res, next) {
        try {
            const {link} = req.params
            const user = await mailsService.activateMail(link)
            return res.json({user})
        } catch(e) {
            next(e)
        }
    }
}

export default new MailsController()