import {Router} from 'express'
import authController from "./auth.controller.js";

const router = new Router()

router.post('/signup', authController.signUp)
router.post('/signin', authController.signIn)
router.post('/logout', authController.logout)

export default router