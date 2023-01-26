import scheme from "../../database/scheme.js";
import {DataTypes} from "sequelize";

const TokensModel = scheme.define('tokens', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    refreshToken: {
        type: DataTypes.STRING
    },
    emailToken: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

export default TokensModel