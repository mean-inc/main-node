import {Router} from "express";
import authRouter from "../auth/auth.router.js";

const router = new Router()

router.use('/auth', authRouter)

export default router