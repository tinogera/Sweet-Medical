import mongoose from "mongoose";
import { Estado, EstadoTurno } from "../domain/turnos/estadoTurno.js";
import { TipoServicio } from "../domain/servicios/servicio.js";
import { MedicoModel } from "./medicoSchema.js";
import { PacienteModel } from "./paciente.schema.js";
import { Turno } from "../domain/turnos/turno.js";

const EstadoTurnoSchema = new mongoose.Schema({
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

EstadoTurnoSchema.loadClass(EstadoTurno);

const TurnoSchema = new mongoose.Schema({
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
    ref: 'Paciente'
  },
  sede: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sede',
    required: true
  },
  servicio: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Servicio'
  },
  estadosTurno: {
    type: [EstadoTurnoSchema],
    default: []
  }
}, {
  versionKey: 'version'
});

TurnoSchema.loadClass(Turno);

export const TurnoModel = mongoose.model('Turno', TurnoSchema);
