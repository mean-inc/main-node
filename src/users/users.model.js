import scheme from "../../database/scheme.js";
import {DataTypes} from "sequelize";
import TokensModel from "../tokens/tokens.model.js";
import {RateDevicesModel} from "../rates/rates.model.js";
import {BasketsModel} from "../baskets/baskets.model.js";

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

UsersModel.hasOne(TokensModel)
TokensModel.belongsTo(UsersModel)

UsersModel.hasMany(RateDevicesModel)
RateDevicesModel.belongsTo(UsersModel)

BasketsModel.hasOne(UsersModel)
UsersModel.belongsTo(BasketsModel)