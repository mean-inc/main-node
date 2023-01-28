import scheme from "../../database/scheme.js";
import {DataTypes} from "sequelize";
import {UsersModel} from "../users/users.model.js";

export const BasketsModel = scheme.define('basket', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
})
