import authService from "./auth.service.js";
import {ApiError} from "../error/index.js";
import {UserModel} from "../user/user.model.js";

class AuthController {

    async signUp(req, res, next) {
        try {
            const {name, surname, email, phone, password} = req.body
            const createdUser = await authService.signUp(name, surname, email, phone, password)
            res.cookie('refreshToken', createdUser.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json({user: createdUser.user, accessToken: createdUser.accessToken})
        } catch (e) {
            return next(e)
        }
    }

    async signIn(req, res, next) {
        try {
            const {email, password} = req.body
            const logginedUser = await authService.signIn(email, password)
            return res.json({accessToken: logginedUser.accessToken, user: logginedUser.user})

        } catch (e) {
            return next(e)
        }
    }

    async logout(req, res, next) {
        try {
            const {email} = req.body
            await authService.logout(email)
            res.clearCookie('refreshToken')
            return res.json({success: true, message: "Logout successfully!"})
        } catch (e) {
            return next(e)
        }
    }

    async refresh(req, res, next) {
        try {

        } catch (e) {
            return next(e)
        }
    }
}

export default new AuthController()