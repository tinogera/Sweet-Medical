import {clone, isUndefined, remove} from "lodash-es"
import { BadRequestError } from "../errors/appErrors.js"

export const MedicoRepository = {
  medicos: [],

  agregarMedico(medico){
    medico.id = this.obtenerSiguienteId()
    this.medicos.push(medico);
    return medico
  },

  listar(){
    return this.medicos;
  },

  obtenerPorId(id){
    const medico = this.medicos.find(m => m.id === id);
    if(!medico){
      throw new BadRequestError(`El medico con id: ${id}, no existe`)
    }
    return medico;
  },

  guardarMedico(id, medicoActualizado){
    remove(this.medicos, m=> m.id === id)
    this.medicos.push(medicoActualizado);
    return medicoActualizado;
  },

  borrar(id){
    remove(this.medicos, m => m.id === id);
  },

  obtenerSiguienteId() {//TODO en una DB real no es necesario
    return (this.medicos[this.medicos.length - 1]?.id || 0) + 1;
  }
}