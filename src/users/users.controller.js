import usersService from "./users.service.js";
import tokensService from "../tokens/tokens.service.js";

class UsersController {

    async editUserSettings(req, res, next) {
        try {
            const {email, password, name, surname, phone, confirmPassword} = req.body
            const token = req.headers.authorization.split(' ')[1]
            const user = tokensService.validateToken(token, process.env.SECRET_ACCESS_TOKEN)
            const editedSettings = await usersService.editSettings(user.id, {email, password, name, surname, phone, confirmPassword})
            return res.json({editedSettings})
        } catch (e) {
            return next(e)
        }
    }
}

export default new UsersController()