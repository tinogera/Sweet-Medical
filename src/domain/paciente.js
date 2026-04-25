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
        thus.listaTurnos=[];
    }
    
    agregarTurno(turno){
        this.turnos.push(turno)
    }

    reservarTurno(turno) {
        turno.reservar(this);
    }

    cancelarTurno(turno, motivo) {
        this.cambiarEstado(Estado.CANCELADO, responsable, motivo);
    }

    consultarHistorial() {
        return this.listaTurnos;
    }

    solicitarCambioDeFecha(turno, nuevaFechaHora) {
        turno.solicitarCambioDeFecha(this, nuevaFechaHora);
    }

    buscarTurnos(turnosDisponibles, filtros) {
        return turnosDisponibles
            .filter(turno => turno.estaDisponible())
    } // es una funcion que a esta hora mi cabeza no la puede procesar.


}













