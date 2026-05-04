import {clone, isUndefined, remove} from "lodash-es";
import { BadRequestError } from "../errors/appErrors.js";

export const TurnoRepository = {
  turnos: [],

  agregarTurno(turno){
    turno.id = this.obtenerSiguienteId()
    this.turnos.push(turno);
    return turno
  },

  listar(){
    return this.turnos;
  },

  obtenerPorId(id){
    const turno = this.turnos.find(c => c.id === id);
    if(!turno){
      throw new BadRequestError(`El turno con id: ${id}, no existe`)
    }
    return turno;
  },

  guardarturno(id, turnoActualizada){
    remove(this.turnos, c=> c.id === id)
    this.turnos.push(turnoActualizada);
    return turnoActualizada;
  },

  borrar(turno){
    remove(this.turnos, t => t.id === turno.id);
  },

  obtenerPaginados(numeroPagina, limitePorPagina, filtros) {
    let turnos = this.listar()

    // TODO agregar filtros

    const inicio = (numeroPagina - 1) * limitePorPagina
    const fin = inicio + limitePorPagina

    return {
      turnos: turnos.slice(inicio, fin),
      totalTurnos: turnos.length
    }
  },

  obtenerSiguienteId() {//TODO en una DB real no es necesario
    return (this.turnos[this.turnos.length - 1]?.id || 0) + 1;
  }
}