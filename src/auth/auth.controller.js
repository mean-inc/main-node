import authService from "./auth.service.js";

class AuthController {

    async signUp(req, res, next) {
        try {
            const {name, surname, email, phone, password} = req.body
            const createdUser = await authService.signUp(name, surname, email, phone, password)
            res.cookie('refreshToken', createdUser.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(createdUser.user, createdUser.accessToken)
        } catch (e) {
            return next(e)
        }
    }

    async signIn(req, res, next) {
        try {
            const {email, password} = req.body
            const user = await authService.signIn(email, password)
            return res.json(user)

        } catch (e) {
            return next(e)
        }
    }
}

export default new AuthController()