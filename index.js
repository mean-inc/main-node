import express from 'express'
import dotenv from 'dotenv'
import scheme from "./database/scheme.js";
import routes from "./src/routes/index.js";
import errorMiddleware from "./src/middleware/error.middleware.js";
dotenv.config()

const PORT = process.env.APP_PORT
const app = express()

app.use(express.json())
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