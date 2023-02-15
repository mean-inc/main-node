import express from 'express'
import dotenv from 'dotenv'
import scheme from "./database/scheme.js";
import routes from "./src/routes.js";
import errorMiddleware from "./src/errors/error.middleware.js";
import cookieParser from "cookie-parser";
import swaggerUi from 'swagger-ui-express'
import docsSwagger from './docs/swagger.json' assert { type: "json" };
import cors from 'cors'
dotenv.config()

const PORT = process.env.PORT
const app = express()

// const specs = swaggerJsdoc(docsSwagger);
app.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(docsSwagger)
);
app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use('/api', routes)
app.use(errorMiddleware)

const startApp = async () => {
    try {
        // await scheme.authenticate()
        // await scheme.sync()
        app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`))
    } catch (e) {
        console.log(e);
    }
}

startApp()
