import app from "./app.js"
import dotenv from "dotenv"
import { connectToDB } from "./config/db.js"

dotenv.config()

const port = process.env.PORT
const host = 'localhost'
const dbConnectionString = process.env.DB_CONNECTION_STRING ?? "mongodb://localhost:27017/sweet-medical"
const dbName = process.env.MONGODB_DB_NAME ?? "sweetmedical"

await connectToDB(dbConnectionString, dbName);

app.listen(port, host, () => {
  console.log(`Servidor corriendo en http://${host}:${port}`)
})
