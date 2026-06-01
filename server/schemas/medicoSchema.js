import mongoose from "mongoose"
import { Medico } from "../domain/personas/medico.js"
import { bloqueHorarioSchema } from "./bloqueHorarioSchema.js"

const medicoSchema = new mongoose.Schema({
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    nombre: {
        type: String,
        required: true,
        trim: true,
        validate:{
            validator: function(v){
                return v && v.length >= 3;
            },
            message: 'El nombre del medico debe tener al menos 3 caracteres'
        }
    },
    apellido: {
        type: String,
        required: true,
        trim: true,
        validate:{
            validator: function(v){
                return v && v.length >= 3;
            },
            message: 'El apellido del medico debe tener al menos 3 caracteres'
        }
    },
    documento: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    servicios: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Servicio'
    }],
    sedes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sede'
    }],
    agenda: [bloqueHorarioSchema]
})

medicoSchema.loadClass(Medico)
export const MedicoModel = mongoose.model('Medico', medicoSchema)