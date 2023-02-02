import {Router} from "express";
import authRouter from "./auth/auth.router.js";
import devicesRouter from "./devices/devices.router.js";
import ratesRouter from "./rates/rates.router.js";
import typesRouter from "./types/types.router.js";
import basketsRouter from "./baskets/baskets.router.js";
import usersRouter from "./users/users.router.js";
import mailsRouter from "./mails/mails.router.js";

const router = new Router()

router.use('/auth', authRouter)
router.use('/devices', devicesRouter)
router.use('/rates', ratesRouter)
router.use('/types', typesRouter)
router.use('/baskets', basketsRouter)
router.use('/users', usersRouter)
router.use('/mails', mailsRouter)

export default router