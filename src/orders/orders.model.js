import scheme from "../../database/scheme.js";
import {DataTypes} from "sequelize";
import {OrderStatusesModel} from "./order-statuses.model.js";
import {OrderDevicesModel} from "./order-devices.model.js";

export const OrdersModel = scheme.define('orders', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    isPaid: {type: DataTypes.BOOLEAN, defaultValue: false}
    // deviceId
    // basketId
    // statusId (pending, complete,
})

OrderStatusesModel.hasMany(OrdersModel)
OrdersModel.belongsTo(OrderStatusesModel)

OrdersModel.hasMany(OrderDevicesModel)
OrderDevicesModel.belongsTo(OrdersModel)