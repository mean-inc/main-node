import scheme from "../../database/scheme.js";
import {DataTypes} from "sequelize";
import {OrdersModel} from "../orders/orders.model.js";

export const DeliveryTypesModel = scheme.define('delivery_types', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    type: {type: DataTypes.STRING, allowNull: false},
}, {
    createdAt: false,
    updatedAt: false
})

DeliveryTypesModel.hasMany(OrdersModel)
OrdersModel.belongsTo(DeliveryTypesModel)