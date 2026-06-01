import {remove} from "lodash-es"
import { NotFoundError } from "../errors/AppErrors.js";

export const PacienteRepository = {
  pacientes: [],

  agregarPaciente(paciente){
    paciente.id = this.obtenerSiguienteId()
    this.pacientes.push(paciente);
    return paciente
  },

  listar(){
    return this.pacientes;
  },

  obtenerPorId(id){
    const paciente = this.pacientes.find(p => p.id === id);
    if(!paciente){
      throw new NotFoundError(`El paciente con id: ${id}, no existe`)
    }
    return paciente;
  },

  guardarpaciente(id, pacienteActualizado){
    remove(this.pacientes, p=> p.id === id)
    this.pacientes.push(pacienteActualizado);
    return pacienteActualizado;
  },

  borrar(id){
    remove(this.pacientes, p => p.id === id);
  },

  obtenerSiguienteId() {//TODO en una DB real no es necesario
    return (this.pacientes[this.pacientes.length - 1]?.id || 0) + 1;
  }
}