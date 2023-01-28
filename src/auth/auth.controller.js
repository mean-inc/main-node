import authService from "./auth.service.js";
import tokenService from "../tokens/tokens.service.js";

class AuthController {

    async signUp(req, res, next) {
        try {
            const {name, surname, email, phone, password} = req.body
            const createdUser = await authService.signUp(name, surname, email, phone, password)
            res.cookie('refreshToken', createdUser.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json({accessToken: createdUser.accessToken, user: createdUser.user})
        } catch (e) {
            return next(e)
        }
    }

    async signIn(req, res, next) {
        try {
            const {email, password} = req.body
            const account = await authService.signIn(email, password)
            res.cookie('refreshToken', account.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json({accessToken: account.accessToken, user: account.user})

        } catch (e) {
            return next(e)
        }
    }

    async logout(req, res, next) {
        try {
            // const {email} = req.body
            const {refreshToken} = req.cookies
            await authService.logout(refreshToken)
            res.clearCookie('refreshToken')
            return res.json({success: true, message: "Logout successfully!"})
        } catch (e) {
            return next(e)
        }
    }

    async refresh(req, res, next) {
        try {
            const {refreshToken} = req.cookies
            const tokens = await tokenService.refresh(refreshToken)
            res.cookie('refreshToken', tokens.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json({success: true, tokens})
        } catch (e) {
            return next(e)
        }
    }
}

export default new AuthController()