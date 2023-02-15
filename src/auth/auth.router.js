import {Router} from 'express'
import authController from "./auth.controller.js";
import authMiddleware from "./auth.middleware.js";

const router = new Router()

router.post('/signup', authController.signUp)
router.post('/signin', authController.signIn)
router.post('/logout', authMiddleware, authController.logout)
router.post('/refresh', authMiddleware, authController.refresh)

export default router