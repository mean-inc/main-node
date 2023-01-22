import {Sequelize} from 'sequelize'
import dotenv from "dotenv";
dotenv.config()

export default new Sequelize(
    process.env.DATABASE_NAME,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD,
    {
        dialect: process.env.DATABASE_DIALECT,
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT
    }
)