import scheme from "../../database/scheme.js";
import {DataTypes} from "sequelize";
import TokenModel from "../token/token.model.js";

export const UsersModel = await scheme.define('users', {
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

UsersModel.hasOne(TokenModel)
TokenModel.belongsTo(UsersModel)