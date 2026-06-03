import { BadRequestError, NotFoundError } from "../errors/AppErrors.js";
import { PacienteModel } from "../schemas/paciente.schema.js";
import { UsuarioModel } from "../schemas/usuario.schema.js";
import { pacienteFromDocument, pacienteToDocument } from "./pacienteMapper.js";

export class PacienteRepository {
  async limpiar() {
    const pacientes = await PacienteModel.find({}, { usuarioId: 1 }).lean();
    const usuarioIds = pacientes
      .map((p) => p.usuarioId)
      .filter((id) => id != null);

    await PacienteModel.deleteMany({});
    if (usuarioIds.length > 0) {
      await UsuarioModel.deleteMany({ _id: { $in: usuarioIds } });
    }
  }
  

  async listar() {
    const docs = await PacienteModel.find().conUsuario();
    return Promise.all(docs.map((doc) => pacienteFromDocument(doc)));
  }

  async obtenerPorId(id) {
    try {
      const doc = await PacienteModel.findById(id).conUsuario();
      if (!doc) {
        throw new NotFoundError(`El paciente con id: ${id}, no existe`);
      }
      return pacienteFromDocument(doc);
    } catch (err) {
      if (err.name === 'CastError') {
        throw new BadRequestError(`El id proporcionado no es válido: ${id}`);
      }
      throw err;
    }
  }

  async agregarPaciente(paciente) {
    const usuarioDoc = await UsuarioModel.create({
      nombre: `${paciente.nombre} ${paciente.apellido}`,
      notificaciones: [],
    });

    paciente.usuario.id = usuarioDoc._id.toString();

    const nuevoDoc = await PacienteModel.create({
      ...pacienteToDocument(paciente),
      usuarioId: usuarioDoc._id,
    });

    paciente.id = nuevoDoc._id.toString();
    return paciente;
  }

  async guardarPaciente(id, pacienteActualizado) {
    const doc = await PacienteModel.findByIdAndUpdate(
      id,
      pacienteToDocument(pacienteActualizado),
      { new: true },
    ).conUsuario();

    if (!doc) {
      throw new NotFoundError(`El paciente con id: ${id}, no existe`);
    }
    return pacienteFromDocument(doc);
  }

  async borrar(id) {
    const doc = await PacienteModel.findByIdAndDelete(id);
    if (doc?.usuarioId) {
      await UsuarioModel.findByIdAndDelete(doc.usuarioId);
    }
  }
}

export const pacienteRepository = new PacienteRepository();
