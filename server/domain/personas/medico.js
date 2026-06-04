import { Usuario } from '../notificaciones/usuario.js';
import { ServicioInexistente } from '../servicios/excepcion.servicio.js';
import { BloqueHorario } from '../turnos/bloqueHorario.js';
import { BloqueHorarioInexistente } from '../turnos/excepcion.turno.js';
import { DisponibilidadInvalida } from './excepcion.persona.js';
import { Turno } from '../turnos/turno.js';

export class Medico {
  generarTurnos(bloqueHorario) {
    const turnos = [];
    const { horaInicio, horaFin, sede } = bloqueHorario;

    // Por defecto 30 min, setear el valor cuando verdaderamente se elija el servicio
    const duracionEnMs = 30 * 60 * 1000;
    let horaInicioActual = new Date(horaInicio.getTime());
    const horaFinLimite = horaFin.getTime();

    while (horaInicioActual.getTime() + duracionEnMs <= horaFinLimite) {
      const fechaHoraTurno = new Date(horaInicioActual.getTime());
      // Se pasa 'this' ya que el médico actual es el responsable de generar sus turnos
      const nuevoTurno = new Turno(fechaHoraTurno, this, sede);
      turnos.push(nuevoTurno);
      horaInicioActual = new Date(horaInicioActual.getTime() + duracionEnMs);
    }

    return turnos;
  }

  constructor(nombre, apellido, documento, servicios, sedes) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.documento = documento;

    this.servicios = servicios || [];
    this.agenda = [];
    this.sedes = sedes || [];

    this.usuario = new Usuario();
  }

  atiendeEn(sede) {
    return this.sedes.some(s => s.nombre === sede.nombre)
  }

  ofrece(servicio) {
    if (!servicio) return false;
    const nombreBusqueda = servicio.nombre?.toLowerCase();
    return this.servicios.some(s => {
      const nombreServicio = s.nombre || s.servicio?.nombre;
      return nombreServicio?.toLowerCase() === nombreBusqueda;
    });
  }

  dejarDeOfrecer(servicio) {
    const index = this.servicios.findIndex(s => s.nombre === servicio.nombre);

    // Si el servicio no lo ofrece, es redundante intentar eliminarlo
    if (index === -1) {
      return
    }

    this.servicios.splice(index, 1);
  }

  agregarSede(sede) {
    if (!this.sedes.includes(sede)) {
      this.sedes.push(sede);
    }
  }

  agregarServicio(servicio) {
    if (!this.ofrece(servicio)) {
      this.servicios.push(servicio);
    }
  }

  agregarDisponibilidad(fechaHoraInicio, fechaHoraFin, sede) {
    if (!this.atiendeEn(sede)) {
      throw new DisponibilidadInvalida(`El médico [${this.id}] NO atiende en [${sede.nombre}].`)
    }
    if (fechaHoraInicio >= fechaHoraFin) {
      throw new DisponibilidadInvalida("La hora de inicio debe ser anterior a la hora de fin")
    }
    if (fechaHoraInicio <= new Date()) {
      throw new DisponibilidadInvalida("No se puede agregar disponibilidad para fechas pasadas")
    }

    const nuevoBloqueHorario = new BloqueHorario(fechaHoraInicio, fechaHoraFin, sede);
    this.agenda.push(nuevoBloqueHorario);

    return nuevoBloqueHorario;
  }

  eliminarBloque(idBloqueAEliminar) {
    const index = this.agenda.findIndex(b => 
        (b._id && b._id.toString() === idBloqueAEliminar.toString()) || 
        (b.id && b.id.toString() === idBloqueAEliminar.toString())
    );
    if (index === -1) throw new BloqueHorarioInexistente();
    this.agenda.splice(index, 1);
  }

  actualizarServicio(nombreServicio, datosNuevos) {
    const index = this.servicios.findIndex(s => s.tieneNombre(nombreServicio));
    if (index === -1) {
      throw new ServicioInexistente("El médico no ofrece el servicio especificado.");
    }
    const servicioPropio = this.servicios[index].clonarCon(datosNuevos);
    // le actualizo el servicio al medico
    this.servicios[index] = servicioPropio;
    return servicioPropio;
  }
}
