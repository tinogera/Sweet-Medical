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



class BloqueHorario{
    constructor(horaInicio, horaFin, sede, fecha, servicio){
        this.horaInicio = horaInicio;
        this.horaFin = horaFin;
        this.sede = sede;
        this.fecha = fecha;
        this.servicio = servicio;
    }
}