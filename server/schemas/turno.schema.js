import { model, Schema } from "mongoose";
import { Estado } from "../domain/turnos/estadoTurno.js";
import { TipoServicio } from "../domain/servicios/servicio.js";
import { MedicoModel } from "./medicoSchema.js";
import { PacienteModel } from "./paciente.shema.js";
import { Turno } from "../domain/turnos/turno.js";


//esta creado este esquema en otro lado? revisar eso
const UbicacionSchema = new Schema({
  latitud: {
    type: Number,
    required: true
  },
  longitud: {
    type: Number,
    required: true
  }
}, {
  _id: false,
  versionKey: false
});

const SedeEmbebidaSchema = new Schema({
  nombre: {
    type: String,
    required: true
  },
  ubicacion: {
    type: UbicacionSchema,
    required: true
  }
}, {
  _id: false,
  versionKey: false
});

const ServicioEmbebidoSchema = new Schema({
  tipoServicio: {
    type: String,
    enum: Object.values(TipoServicio),
    required: true
  },
  nombre: {
    type: String,
    required: true
  },
  precio: {
    type: Number,
    required: true
  },
  duracion: {
    type: Number,
    required: true
  }
}, {
  _id: false,
  versionKey: false
});


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
  _id: {
    type: Number,
    required: true
  },
  fechaHora: {
    type: Date,
    required: true
  },
  medico: {
    type: MedicoModel.schema,
    required: true
  },
  paciente: {
    type: PacienteModel.schema,
    default: null
  },
  sede: {
    type: SedeEmbebidaSchema,
    required: true
  },
  servicio: {
    type: ServicioEmbebidoSchema,
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
