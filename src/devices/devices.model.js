import scheme from "../../database/scheme.js";
import {DataTypes} from "sequelize";
import {TypesModel} from "../types/types.model.js";
import {ImageDevicesModel} from "../images/image-devices.model.js";
import {ImagesModel} from "../images/images.model.js";
import {BasketDeviceModel} from "../baskets/basket-devices.model.js";
import {RateDevicesModel} from "../rates/rates.model.js";

export const DevicesModel = scheme.define('device', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
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
    typeId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
})

DevicesModel.hasOne(BasketDeviceModel)
BasketDeviceModel.belongsTo(DevicesModel)

DevicesModel.hasMany(TypesModel)
TypesModel.belongsTo(DevicesModel)

DevicesModel.belongsToMany(ImagesModel, {through: ImageDevicesModel})
ImagesModel.belongsToMany(DevicesModel, {through: ImageDevicesModel})