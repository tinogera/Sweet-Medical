import app from "./app.js"
import dotenv from "dotenv"
import { connectToDB } from "./app/db.js"

dotenv.config()

const port = process.env.PORT
const host = 'localhost'
const dbConnectionString = process.env.DB_CONNECTION_STRING ?? "mongodb://localhost:27017/sweet-medical"

await connectToDB(dbConnectionString);

app.listen(port, host, () => {
  console.log(`Servidor corriendo en http://${host}:${port}`)
})
