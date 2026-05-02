import app from "./app.js"
import dotenv from "dotenv"

dotenv.config()

const port = process.env.PORT
const host = 'localhost'

app.listen(port, host, () => {
    console.log(`Servidor corriendo en http://${host}:${port}`)
})