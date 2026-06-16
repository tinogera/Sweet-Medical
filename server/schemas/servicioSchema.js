import mongoose from "mongoose"
import { Servicio, TipoServicio } from "../domain/servicios/servicio.js"

const servicioSchema = new mongoose.Schema({
    tipoServicio: {
        type: String,
        required: true,
        enum: Object.values(TipoServicio),
        default: TipoServicio.ESPECIALIDAD
    },
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    descripcion: {
        type: String
    },
    precio: {
        type: Number,
        required: true,
        min: 0
    },
    duracion: {
        type: Number,
        required: true,
        min: 1
    }
})

servicioSchema.loadClass(Servicio)
export const ServicioModel = mongoose.model('Servicio', servicioSchema)