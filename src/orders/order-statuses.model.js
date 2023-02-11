import scheme from '../../database/scheme.js'
import {DataTypes} from "sequelize";

export const OrderStatusesModel = scheme.define('order_statuses', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    status: DataTypes.STRING
}, {
    updatedAt: false,
    createdAt: false
})