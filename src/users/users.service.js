import {UsersModel} from "./users.model.js";
import {ApiError} from "../errors/error.api.js";
import bcrypt from "bcrypt";

class UsersService {

    async editSettings(userId, data) {
        let user = await UsersModel.findOne({where: {id: userId}})
        if (!user) {
            throw ApiError.forbidden('forbidden')
        }

        data.name ? user.name = data.name : data
        data.surname ? user.surname = data.surname : data
        data.email ? user.email = data.email : data
        data.phone ? user.phone = data.phone : data
        data.password && data ? user.name = data.name : data
        if (data.password && data.confirmPassword && data.password === data.confirmPassword) {
            const hashPassword = bcrypt.hashSync(data.password, 10)
            user.password = hashPassword
        }
        await user.save()
        return user
    }
}

export default new UsersService()