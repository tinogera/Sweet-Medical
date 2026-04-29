import { ObraSocial } from './obraSocial.js';
import { Plan } from './plan.js';

export class Paciente {
    constructor(nombre, apellido, documento, obraSocial, plan) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.documento = documento;
        this.obraSocial = obraSocial;
        this.plan = plan;
        this.notificacionesPendientes = [];
        this.notificacionesVistas = [];
        this.turnos = []
    }

    agregarTurno(turno){
        this.turnos.push(turno)
    }

    reservarTurno(turno) {
        turno.reservar(this);
    }

    cancelarTurno(turno, motivo) {
      turno.cancelar(this, motivo)
    }

    consultarHistorial() {
        return this.turnos;
    }

    solicitarCambioDeFecha(turno, nuevaFechaHora) {
        turno.solicitarCambioDeFecha(this, nuevaFechaHora);
    }


    recibirNotificacion(notificacion){
        this.notificacionesPendientes.push(notificacion)
    }

    verNotificacion(notificacion){
        //busca en qué posición (índice) se encuentra el objeto notificacion dentro del arreglo notificacionesPendientes
        const index = this.notificacionesPendientes.indexOf(notificacion);

        if (index === -1) {
        throw new Error("La notificación no se encuentra en la lista de pendientes.");
        }
        
        //se elimina físicamente la notificación de la lista de pendientes. El 1 indica que solo quiero borrar un elemento a partir de esa posición.
        this.notificacionesPendientes.splice(index, 1);

        this.notificacionesVistas.push(notificacion);
    
        notificacion.marcarComoVista(new Date());
    }


    obtenerNotificacionesSinLeer(){
        return this.notificacionesPendientes
    }

    obtenerNotificacionesLeidas(){
        return this.notificacionesVistas
        }
}

