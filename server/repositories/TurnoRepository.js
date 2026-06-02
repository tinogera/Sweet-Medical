/*import {remove} from "lodash-es"
import { BadRequestError } from "../errors/AppErrors.js"
import { TipoServicio } from "../domain/servicios/servicio.js"
import { Estado } from "../domain/turnos/estadoTurno.js"

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

  borrarDisponiblesFuturos(medicoId, bloqueHorario) {
    const now = new Date();
    remove(this.turnos, t =>
      t.medico.id === medicoId &&
      t.sede.nombre === bloqueHorario.sede.nombre &&
      t.servicio.nombre === bloqueHorario.servicio.nombre &&
      t.fechaHora >= now &&
      t.fechaHora >= bloqueHorario.horaInicio &&
      t.fechaHora < bloqueHorario.horaFin &&
      t.estadoActual().estado === Estado.DISPONIBLE
    );
  },

  obtenerDisponiblesPaginados(numeroPagina, limitePorPagina, filtros, ordenarPor = 'fecha', direccion = 'asc', paciente) {
    let turnos = this.listar()

    turnos = turnos.filter(t => t.estadoActual().estado === Estado.DISPONIBLE)

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
      turnos = turnos.filter(t => t.fechaHora.getTime() >= filtros.fechaDesde.getTime())
    }

    if (filtros.fechaHasta) {
      turnos = turnos.filter(t => t.fechaHora.getTime() <= filtros.fechaHasta.getTime())
    }

    // Ordenamos
    turnos.sort((a, b) => {
      let valorA, valorB

      if (ordenarPor === 'fecha') {
        valorA = a.fechaHora.getTime()
        valorB = b.fechaHora.getTime()
      } else if (ordenarPor === 'costo') {
        valorA = paciente.plan.precioDe(a.servicio)
        valorB = paciente.plan.precioDe(b.servicio)
      }

      if (direccion === 'asc') {
        return valorA - valorB
      } else {
        return valorB - valorA
      }
    })

    const inicio = (numeroPagina - 1) * limitePorPagina
    const fin = inicio + limitePorPagina

    return {
      turnos: turnos.slice(inicio, fin),
      totalTurnos: turnos.length
    }
  },

  obtenerTurnosDePaciente(pacienteId, numeroPagina, limitePorPagina) {
    const turnosDelPaciente = this.turnos.filter(t => t.paciente && t.paciente.id === pacienteId);

    const inicio = (numeroPagina - 1) * limitePorPagina;
    const fin = inicio + limitePorPagina;

    return {
      turnos: turnosDelPaciente.slice(inicio, fin),
      totalTurnos: turnosDelPaciente.length
    };
  },

  obtenerSiguienteId() {//TODO en una DB real no es necesario
    return (this.turnos[this.turnos.length - 1]?.id || 0) + 1;
  }
}
  */

class TurnoRepositoryImpl {
  constructor() {
    this.model = TurnoModel;
  }

  async agregarTurno(turno) {
    const nuevoDoc = new this.model(turno);
    return await nuevoDoc.save();
  }

  async guardarturno(id, turnoModificado) {
    return await this.model.findByIdAndUpdate(id, turnoModificado, { new: true });
  }

  async reservarTurnoDisponible(id, paciente, nuevoEstado) {
    return await this.model.findOneAndUpdate(
      { _id: id, paciente: null },
      { 
        $set: { paciente: paciente },
        $push: { estadosTurno: nuevoEstado }
      },
      { new: true }
    );
  }

  async borrar(id) {
    return await this.model.findByIdAndDelete(id);
  }

  async listar() {
    return await this.model.find();  }

  async obtenerPorId(id) {
    return await this.model.findById(id);
  }

  async obtenerSiguienteId() {
    const ultimo = await this.model.findOne().sort({ _id: -1 });
    return (ultimo?._id || 0) + 1;
  }

  async borrarDisponiblesFuturos(medicoId, bloqueHorario) {
    const turnos = await this.encontrarTodos();
    const now = new Date();

    const aEliminar = turnos.filter(t =>
      (t.medico?.id === medicoId || t.medico === medicoId) &&
      t.sede.nombre === bloqueHorario.sede.nombre &&
      t.servicio.nombre === bloqueHorario.servicio.nombre &&
      t.fechaHora >= now &&
      t.fechaHora >= bloqueHorario.horaInicio &&
      t.fechaHora < bloqueHorario.horaFin &&
      t.estadoActual().estado === Estado.DISPONIBLE
    );

    for (const t of aEliminar) {
      await this.borrar(t._id);
    }
  }

  async obtenerDisponiblesPaginados(numeroPagina, limitePorPagina, filtros, ordenarPor = 'fecha', direccion = 'asc', paciente) {
    let turnos = await this.encontrarTodos();

    turnos = turnos.filter(t => t.estadoActual().estado === Estado.DISPONIBLE);

    if (filtros.profesional) {
      turnos = turnos.filter(t => t.medico?.id === filtros.profesional || t.medico === filtros.profesional);
    }

    if (filtros.especialidad) {
      turnos = turnos.filter(t => t.servicio.tipoServicio === TipoServicio.ESPECIALIDAD && t.servicio.nombre.toLowerCase().includes(filtros.especialidad.toLowerCase()));
    }

    if (filtros.practica) {
      turnos = turnos.filter(t => t.servicio.tipoServicio === TipoServicio.PRACTICA && t.servicio.nombre.toLowerCase().includes(filtros.practica.toLowerCase()));
    }

    if (filtros.sede) {
      turnos = turnos.filter(t => t.sede.nombre.toLowerCase().includes(filtros.sede.toLowerCase()));
    }

    if (filtros.fechaDesde) {
      turnos = turnos.filter(t => t.fechaHora.getTime() >= filtros.fechaDesde.getTime());
    }

    if (filtros.fechaHasta) {
      turnos = turnos.filter(t => t.fechaHora.getTime() <= filtros.fechaHasta.getTime());
    }

    // Ordenamiento
    turnos.sort((a, b) => {
      let valorA, valorB;

      if (ordenarPor === 'fecha') {
        valorA = a.fechaHora.getTime();
        valorB = b.fechaHora.getTime();
      } else if (ordenarPor === 'costo') {
        valorA = paciente.plan.precioDe(a.servicio);
        valorB = paciente.plan.precioDe(b.servicio);
      }

      return direccion === 'asc' ? valorA - valorB : valorB - valorA;
    });

    const inicio = (numeroPagina - 1) * limitePorPagina;
    const fin = inicio + limitePorPagina;

    return {
      turnos: turnos.slice(inicio, fin),
      totalTurnos: turnos.length
    };
  }

  async obtenerTurnosDePaciente(pacienteId, numeroPagina, limitePorPagina) {
    const turnos = await this.encontrarTodos();
    const turnosDelPaciente = turnos.filter(t => t.paciente && (t.paciente.id === pacienteId || t.paciente === pacienteId));

    const inicio = (numeroPagina - 1) * limitePorPagina;
    const fin = inicio + limitePorPagina;

    return {
      turnos: turnosDelPaciente.slice(inicio, fin),
      totalTurnos: turnosDelPaciente.length
    };
  }
}

export const TurnoRepository = new TurnoRepositoryImpl();