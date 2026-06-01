import mongoose from "mongoose"
import { ubicacionSchema } from "./ubicacionSchema.js"
import { Sede } from "../domain/sedes/sede.js"

const sedeSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    ubicacion: ubicacionSchema
})

sedeSchema.loadClass(Sede)
export const SedeModel = mongoose.model('Sede', sedeSchema)