import { model, Schema } from "mongoose";

const CoberturaSchema = new Schema(
  {
    servicio: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Servicio'
    },
    porcentaje: Number,
  },
  { versionKey: false },
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

export const PacienteModel = model("Paciente", PacienteSchema);
