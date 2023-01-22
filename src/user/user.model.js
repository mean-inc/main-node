import scheme from "../../database/scheme.js";
import {DataTypes} from "sequelize";
import TokenModel from "../token/token.model.js";

export const UserModel = await scheme.define('users', {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    surname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isActivate: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
})

UserModel.hasOne(TokenModel)
TokenModel.belongsTo(UserModel)