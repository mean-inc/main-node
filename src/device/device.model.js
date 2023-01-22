import scheme from "../../database/scheme.js";
import {DataTypes} from "sequelize";
import {BasketDeviceModel} from "../basket/basket.model.js";

export const DeviceModel = scheme.define('device', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    typeId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

DeviceModel.hasOne(BasketDeviceModel)
BasketDeviceModel.belongsTo(DeviceModel)