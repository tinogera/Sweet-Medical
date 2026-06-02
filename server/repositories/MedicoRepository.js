import { remove } from "lodash-es"
import { MedicoModel } from "../schemas/medicoSchema.js";
import { medicoToDocument } from "./medicoMapper.js";
import { UsuarioModel } from "../schemas/usuario.schema.js";

export class MedicoRepository {
  constructor() {
    this.model = MedicoModel
  }

  async findAll() {
    return await this.model.find().populate('servicios sedes usuario agenda.sede')
  }

  async findById(id) {
    return await this.model.findById(id).populate('servicios sedes usuario agenda.sede')
  }

  async save(medico) {
    if (medico.usuario && !medico.usuario.id) {
      const usuarioDoc = await UsuarioModel.create({
        nombre: `${medico.nombre} ${medico.apellido}`,
        notificaciones: []
      });
      medico.usuario.id = usuarioDoc._id.toString();
    }

    const medicoNuevo = new this.model(medicoToDocument(medico))
    const savedDoc = await medicoNuevo.save()
    
    medico._id = savedDoc._id
    return savedDoc
  }

  async update(id, medicoModificado) {
    return await this.model.findByIdAndUpdate(id, medicoToDocument(medicoModificado), {new: true})
  }

  async delete(id) {
    return await this.model.findByIdAndDelete(id)
  }

  async count() {
    return await this.model.countDocuments()
  }

  async deleteAll() {
    return await this.model.deleteMany({})
  }
}

export const medicoRepository = new MedicoRepository()
