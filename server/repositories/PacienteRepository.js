import { NotFoundError } from "../errors/AppErrors.js";
import { PacienteModel } from "../schemas/paciente.schema.js";
import { UsuarioModel } from "../schemas/usuario.schema.js";
import { pacienteFromDocument, pacienteToDocument } from "./pacienteMapper.js";
import { usuarioRepository } from "./UsuarioRepository.js";

class PacienteRepository {
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
    const docs = await PacienteModel.find().sort({ id: 1 }).conUsuario();
    return docs.map((doc) => pacienteFromDocument(doc));
  }

  async obtenerPorId(id) {
    const doc = await PacienteModel.findOne({ id: Number(id) }).conUsuario();
    if (!doc) {
      throw new NotFoundError(`El paciente con id: ${id}, no existe`);
    }
    return pacienteFromDocument(doc);
  }

  async agregarPaciente(paciente) {
    const usuarioDoc = await UsuarioModel.create({
      nombre: `${paciente.nombre} ${paciente.apellido}`,
      notificaciones: [],
    });

    paciente.usuario.id = usuarioDoc._id.toString();
    paciente.id = await this.#obtenerSiguienteId();

    await PacienteModel.create({
      ...pacienteToDocument(paciente),
      usuarioId: usuarioDoc._id,
    });

    return paciente;
  }

  async guardarPaciente(id, pacienteActualizado) {
    const doc = await PacienteModel.findOneAndUpdate(
      { id: Number(id) },
      pacienteToDocument(pacienteActualizado),
      { new: true },
    ).conUsuario();

    if (!doc) {
      throw new NotFoundError(`El paciente con id: ${id}, no existe`);
    }
    return pacienteFromDocument(doc);
  }

  async borrar(id) {
    const doc = await PacienteModel.findOneAndDelete({ id: Number(id) });
    if (doc?.usuarioId) {
      await UsuarioModel.findByIdAndDelete(doc.usuarioId);
    }
  }

  async guardarUsuario(paciente) {
    if (!paciente.usuario?.id) return;
    await usuarioRepository.save(paciente.usuario);
  }

  async #obtenerSiguienteId() {
    const ultimo = await PacienteModel.findOne()
      .sort({ id: -1 })
      .select("id")
      .lean();
    return (ultimo?.id || 0) + 1;
  }
}

export const pacienteRepository = new PacienteRepository();
