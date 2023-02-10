import scheme from "../../database/scheme.js";
import {DataTypes} from "sequelize";
import {OrderStatusesModel} from "./order-statuses.model.js";

export const OrdersModel = scheme.define('orders', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    amount: {type: DataTypes.INTEGER, defaultValue: 1, allowNull: false}
    // deviceId
    // basketId
    // statusId (pending, complete,
})

OrderStatusesModel.hasMany(OrdersModel)
OrdersModel.belongsTo(OrderStatusesModel)