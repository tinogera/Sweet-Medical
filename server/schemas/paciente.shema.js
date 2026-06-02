import { model, Schema } from "mongoose";
import { Paciente } from "../domain/personas/paciente.js";
import { Plan } from "../domain/obrasSociales/plan.js";

const ServicioEmbeddedSchema = new Schema(
  {
    tipoServicio: String,
    nombre: String,
    precio: Number,
    duracion: Number,
  },
  { _id: false, versionKey: false },
);

const CoberturaSchema = new Schema(
  {
    servicio: ServicioEmbeddedSchema,
    porcentaje: Number,
  },
  { _id: false, versionKey: false },
);

const PlanSchema = new Schema(
  {
    tipo: String,
    coberturaPorServicio: [CoberturaSchema],
  },
  { _id: false, versionKey: false },
);

const ObraSocialSchema = new Schema(
  {
    nombre: String,
  },
  { _id: false, versionKey: false },
);

const PacienteSchema = new Schema(
  {
    id: { type: Number, required: true, unique: true },
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    documento: { type: String, required: true, unique: true },
    obraSocial: { type: ObraSocialSchema, required: true },
    plan: { type: PlanSchema, required: true },
    usuarioId: { type: Schema.Types.ObjectId, ref: "Usuario", required: true },
  },
  { versionKey: false },
);

PacienteSchema.query.conUsuario = function conUsuario() {
  return this.populate("usuarioId");
};



PacienteSchema.loadClass(Paciente);
PlanSchema.loadClass(Plan);

export const PacienteModel = model("Paciente", PacienteSchema);