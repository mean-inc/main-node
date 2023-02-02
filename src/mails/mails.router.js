import {Router} from 'express'
import mailsController from "./mails.controller.js";

const mailsRouter = new Router()

mailsRouter.post('/send', mailsController.sendMail)
mailsRouter.get('/activate/:link', mailsController.activateAccount)

export default mailsRouter