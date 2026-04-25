class Medico{
    constructor(nombre, apellido, documento, servicios, agenda) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.documento = documento;
        this.servicios = servicios;
        this.agenda = agenda;
        this.notificacionesPendientes = [];
        this.notificacionesVistas = [];
        this.turnosHistorico = [];
    }


    agregarDisponibilidad(horaInicio, horaFin, sede, fecha, servicio){
        const nuevoBloqueHorario = new BloqueHorario(horaInicio, horaFin, sede, fecha, servicio);
        this.agenda.push(nuevoBloqueHorario);
        
        const nuevosTurnos = GeneradorDeTurnos.generarTurnos(this, nuevoBloqueHorario);

        this.turnosHistorico.push(nuevosTurnos);
    } //FALTA chequear el tema de si la nueva disponibilidad cambia a otra, 
    // aca asumo que se crea un bloque horario completamente nuevo
}



class BloqueHorario{
    constructor(horaInicio, horaFin, sede, fecha, servicio){
        this.horaInicio = horaInicio;
        this.horaFin = horaFin;
        this.sede = sede;
        this.fecha = fecha;
        this.servicio = servicio;
    }
}