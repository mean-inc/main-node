import {Router} from "express";
import authRouter from "./auth/auth.router.js";
import devicesRouter from "./devices/devices.router.js";

const router = new Router()

router.use('/auth', authRouter)
router.use('/devices', devicesRouter)

export default router