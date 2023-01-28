import scheme from "../../database/scheme.js";
import {DataTypes} from "sequelize";
import {BasketsModel} from "./baskets.model.js";

export const BasketDeviceModel = scheme.define('basket_devices', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    }
})

BasketsModel.hasMany(BasketDeviceModel)
BasketDeviceModel.belongsTo(BasketsModel)