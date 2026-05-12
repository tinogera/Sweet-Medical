import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import router from "./routes/router.js"
import { errorHandler } from "./middlewares/errorHandler.js"
import swaggerUi from "swagger-ui-express"
import swaggerFile from './api-documentation.json' with { type: 'json' };
import morgan from 'morgan'

dotenv.config()

const app = express()


app.use(morgan('tiny'))
app.use(express.json())
app.use(cors())
app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))
app.use(router)
app.use(errorHandler)

export default app
