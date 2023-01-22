import scheme from "../../database/scheme.js";
import {DataTypes} from "sequelize";

const TokenModel = scheme.define('tokens', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    refreshToken: {
        type: DataTypes.STRING,
        allowNull: false
    },
    emailToken: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

export default TokenModel