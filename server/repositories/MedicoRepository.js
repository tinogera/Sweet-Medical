import { remove } from "lodash-es"
import { MedicoModel } from "../schemas/medicoSchema.js";

/*
export const MedicoRepository = {
  medicos: [],
  bloqueIdCounter: 0,

  agregarMedico(medico) {
    medico.id = this.obtenerSiguienteId()
    this.medicos.push(medico);
    return medico
  },

  listar() {
    return this.medicos;
  },

  obtenerPorId(id) {
    const medico = this.medicos.find(m => m.id === id)
    return medico;
  },

  guardarMedico(id, medicoActualizado) {
    remove(this.medicos, m => m.id === id)
    this.medicos.push(medicoActualizado);
    return medicoActualizado;
  },

  borrar(id) {
    remove(this.medicos, m => m.id === id);
  },

  obtenerSiguienteId() {//TODO en una DB real no es necesario
    return (this.medicos[this.medicos.length - 1]?.id || 0) + 1;
  },

  obtenerSiguienteIdBloque() {
    this.bloqueIdCounter += 1;
    return this.bloqueIdCounter;
  }
}
*/

export class MedicoRepository {
  constructor() {
    this.model = MedicoModel
  }

  async findAll() {
    return await this.model.find()
  }

  async findById(id) {
    return await this.model.findById(id)
  }

  async save(medico) {
    const medicoNuevo = new this.model(medico)
    return await medicoNuevo.save()
  }

  async update(id, medicoModificado) {
    return await this.model.findByIdAndUpdate(id, medicoModificado, {new: true})
  }

  async delete(id) {
    return await this.model.findByIdAndDelete(id)
  }

  async count() {
    return await this.model.countDocuments()
  }
}