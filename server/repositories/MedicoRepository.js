import { remove } from "lodash-es"
import { NotFoundError } from "../errors/AppErrors.js"

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

  obtenerTodos() {
    return this.medicos;
  },

  obtenerPorId(id) {
    const medico = this.medicos.find(m => m.id === id)
    if (!medico) {
      throw new NotFoundError(`El médico con id: ${id}, no existe`)
    }
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
