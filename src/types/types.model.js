import scheme from "../../database/scheme.js";
import {DataTypes} from "sequelize";
import {ImagesModel} from "../images/images.model.js";

export const TypesModel = scheme.define('types', {
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
},{
    createdAt: false,
    updatedAt: false
})

ImagesModel.hasOne(TypesModel)
TypesModel.belongsTo(ImagesModel)