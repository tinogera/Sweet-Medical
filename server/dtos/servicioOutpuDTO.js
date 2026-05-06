export class ServicioOutputDTO {
    constructor(servicio) {
        this.tipoServicio = servicio.tipoServicio;
        this.nombre = servicio.nombre;
        this.precio = servicio.precio;
        this.duracion = servicio.duracion;
    }
}
   