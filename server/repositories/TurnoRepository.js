import {clone, isUndefined, remove} from "lodash-es"
import { BadRequestError } from "../errors/appErrors.js"
import { TipoServicio } from "../domain/servicios/servicio.js"

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
    const turno = this.turnos.find(t => t.id === id);
    if(!turno){
      throw new BadRequestError(`El turno con id: ${id}, no existe`)
    }
    return turno;
  },

  guardarturno(id, turnoActualizado){
    remove(this.turnos, t=> t.id === id)
    this.turnos.push(turnoActualizado);
    return turnoActualizado;
  },

  borrar(turno){
    remove(this.turnos, t => t.id === turno.id);
  },

  obtenerPaginados(numeroPagina, limitePorPagina, filtros) {
    let turnos = this.listar()

    if (filtros.profesional) {
      turnos = turnos.filter(t => t.medico.id === filtros.profesional)
    }

    if (filtros.especialidad) {
      turnos = turnos.filter(t => t.servicio.tipoServicio === TipoServicio.ESPECIALIDAD && t.servicio.nombre.toLowerCase().includes(filtros.especialidad.toLowerCase()))
    }

    if (filtros.practica) {
      turnos = turnos.filter(t => t.servicio.tipoServicio === TipoServicio.PRACTICA && t.servicio.nombre.toLowerCase().includes(filtros.practica.toLowerCase()))    
    }

    if (filtros.sede) {
      turnos = turnos.filter(t => t.sede.nombre.toLowerCase().includes(filtros.sede.toLowerCase()))
    }

    if (filtros.fechaDesde) {
      turnos = turnos.filter(t => t.fechaHora >= filtros.fechaDesde)
    }

    if (filtros.fechaHasta) {
      turnos = turnos.filter(t => t.fechaHora <= filtros.fechaHasta)
    }

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