import mailsService from "./mails.service.js";

class MailsController {

    async sendMail(req, res, next) {
        try {
            const {email} = req.body
            const link = await mailsService.getActivateLinkByEmail(email)
            await mailsService.sendActivateMail(email, link)
            return res.json({success: true, message: "Mail send successfully"})
        } catch(e) {
            next(e)
        }
    }

    async activateAccount(req, res, next) {
        try {
            const {link} = req.params
            await mailsService.activateMail(link)
            return res.redirect('https://youtube.com/')
        } catch(e) {
            next(e)
        }
    }
}

export default new MailsController()