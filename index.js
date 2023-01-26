import express from 'express'
import dotenv from 'dotenv'
import scheme from "./database/scheme.js";
import routes from "./src/routes.js";
import errorMiddleware from "./src/errors/error.middleware.js";
import cookieParser from "cookie-parser";
dotenv.config()

const PORT = process.env.PORT
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use('/api', routes)
app.use(errorMiddleware)

const startApp = async () => {
    try {
        await scheme.authenticate()
        await scheme.sync()
        app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`))
    } catch (e) {
        console.log(e);
    }
}

startApp()