import mongoose from "mongoose"
import { Ubicacion } from "../domain/sedes/ubicacion.js"

export const ubicacionSchema = new mongoose.Schema({
    latitud: {
        type: String,
        required: true
    },
    longitud: {
        type: String,
        required: true
    }
}, { _id: false})

ubicacionSchema.loadClass(Ubicacion)