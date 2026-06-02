import { Schema, model } from 'mongoose'
import { Servicio, TipoServicio } from '../domain/servicios/servicio.js'

export const servicioSchema = new Schema({
    tipoServicio: {
        type: String,
        enum: Object.values(TipoServicio), 
        required: true,
        default: TipoServicio.ESPECIALIDAD
    },
    nombre:{
        type: String,
        required : true,
        unique : true,
        trim : true
    },
    duracion:{
        type: Number,
        required : true
    },
    precio:{
        type: Number,
        required : true,
        min: 0
    },
}, {
    versionKey: false
})


servicioSchema.loadClass(Servicio)

export const ServicioModel = model('Servicio', servicioSchema)