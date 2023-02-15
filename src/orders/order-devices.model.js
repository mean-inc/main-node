import scheme from "../../database/scheme.js";
import {DataTypes} from "sequelize";

export const OrderDevicesModel = scheme.define('order_devices', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    amount: {type: DataTypes.INTEGER, defaultValue: 1},
    price: {type: DataTypes.DOUBLE},
    sum: {type: DataTypes.INTEGER},
})
