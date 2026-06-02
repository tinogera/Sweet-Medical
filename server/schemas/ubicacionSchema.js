import mongoose from "mongoose";
import { Ubicacion } from "../domain/sedes/ubicacion.js";

const ubicacionSchema = new mongoose.Schema({
  latitud: {
    type: Number,
    required: true,
  },
  longitud: {
    type: Number,
    required: true,
  },
});

ubicacionSchema.loadClass(Ubicacion);

export const UbicacionModel = mongoose.model("Ubicacion", ubicacionSchema);