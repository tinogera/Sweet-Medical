import mongoose from "mongoose"
import { BloqueHorario } from "../domain/turnos/bloqueHorario.js"

export const bloqueHorarioSchema = new mongoose.Schema({
    sede: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sede'
    },
    horaInicio: {
        type: Date,
        required: true
    },
    horaFin: {
        type: Date,
        required: true
    }
})

bloqueHorarioSchema.loadClass(BloqueHorario)