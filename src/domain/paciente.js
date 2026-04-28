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
}

