import mongoose from "mongoose";

const CoberturaSchema = new mongoose.Schema(
  {
    servicio: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Servicio'
    },
    porcentaje: Number,
  },
  { versionKey: false },
);

const PlanSchema = new mongoose.Schema(
  {
    tipo: String,
    coberturaPorServicio: [CoberturaSchema],
  },
  { _id: false, versionKey: false },
);

const ObraSocialSchema = new mongoose.Schema(
  {
    nombre: String,
  },
  { _id: false, versionKey: false },
);

const PacienteSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    documento: { type: String, required: true, unique: true },
    obraSocial: { type: ObraSocialSchema, required: true },
    plan: { type: PlanSchema, required: true },
    usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true },
  },
  { versionKey: false },
);

PacienteSchema.query.conUsuario = function conUsuario() {
  return this.populate("usuarioId");
};

export const PacienteModel = mongoose.model("Paciente", PacienteSchema);
