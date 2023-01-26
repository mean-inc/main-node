import scheme from "../../database/scheme.js";
import {DataTypes} from "sequelize";
import {UsersModel} from "../users/user.model.js";

export const BasketModel = scheme.define('basket', {
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

export const BasketDeviceModel = scheme.define('basketDevice', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    deviceId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    basketId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    }
})

BasketModel.hasOne(UsersModel)
UsersModel.belongsTo(BasketModel)

BasketModel.hasMany(BasketDeviceModel)
BasketDeviceModel.belongsTo(BasketModel)