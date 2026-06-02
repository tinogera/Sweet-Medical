import { model, Schema } from "mongoose";
import { Estado } from "../domain/turnos/estadoTurno.js";
import { TipoServicio } from "../domain/servicios/servicio.js";
import { MedicoModel } from "./medicoSchema.js";
import { PacienteModel } from "./paciente.shema.js";
import { Turno } from "../domain/turnos/turno.js";

const EstadoTurnoSchema = new Schema({
  estado: {
    type: String,
    enum: Object.values(Estado),
    required: true
  },
  fechaHora: {
    type: Date,
    default: Date.now,
    required: true
  },
  motivo: {
    type: String,
    default: ""
  }
}, {
  _id: false,
  versionKey: false
});

const TurnoSchema = new Schema({
  fechaHora: {
    type: Date,
    required: true
  },
  medico: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Medico',
    required: true
  },
  paciente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Paciente',
    required: true
  },
  sede: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sede',
    required: true
  }],
  servicio: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Servicio',
    required: true
  },
  estadosTurno: {
    type: [EstadoTurnoSchema],
    default: []
  }
}, {
  versionKey: false
});

TurnoSchema.loadClass(Turno);

export const TurnoModel = model('Turno', TurnoSchema);
