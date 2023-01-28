import scheme from "../../database/scheme.js";
import {DataTypes} from "sequelize";
import {DevicesModel} from "../devices/devices.model.js";

export const RateDevicesModel = scheme.define('rate-devices', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    deviceId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
})

DevicesModel.hasOne(RateDevicesModel)
RateDevicesModel.belongsTo(DevicesModel)