export class Servicio {
  constructor(tipoDeServicio, nombre, precio, duracionEnMinutos) {
    if (duracion < 0 || duracion > DURACION_MAXIMA) {
      throw new Error(`La duración ${duracionEnMinutos} tiene que tener sentido`)
    }

    this.tipoDeServicio = tipoDeServicio;
    this.nombre = nombre;
    this.precio = precio;
    this.duracion = duracionEnMinutos;
  }
}

const TipoServicio = Object.freeze({
  ESPECIALIDAD: 'ESPECIALIDAD',
  PRACTICA: 'PRACTICA',
});

const DURACION_MAXIMA = 1440 // un dia??
