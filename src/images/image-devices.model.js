import scheme from "../../database/scheme.js";
import {DataTypes} from "sequelize";

export const ImageDevicesModel = scheme.define('image-devices', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    }
},{
    createdAt: false,
    updatedAt: false
})