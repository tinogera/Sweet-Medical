export class Servicio {
  constructor(tipoDeServicio, nombre, precio, duracionEnMinutos) {
    if (duracionEnMinutos < 0 || duracionEnMinutos > DURACION_MAXIMA) {
      throw new Error(`La duración ${duracionEnMinutos} tiene que tener sentido`)
    }

    this.tipoServicio = tipoDeServicio;
    this.nombre = nombre;
    this.precio = precio;
    this.duracion = duracionEnMinutos;
  }
}

export const TipoServicio = Object.freeze({
  ESPECIALIDAD: 'ESPECIALIDAD',
  PRACTICA: 'PRACTICA'
});

const DURACION_MAXIMA = 1440 // un dia??
