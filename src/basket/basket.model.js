import scheme from "../../database/scheme.js";
import {DataTypes} from "sequelize";
import UserModel from "../user/user.model.js";

const BasketModel = scheme.define('basket', {
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

const BasketDeviceModel = scheme.define('basketDevice', {
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
    }
})

BasketModel.hasOne(UserModel)
UserModel.belongsTo(BasketModel)

BasketModel.hasMany(BasketDeviceModel)
BasketDeviceModel.belongsTo(BasketModel)