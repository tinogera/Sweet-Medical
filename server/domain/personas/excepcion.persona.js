
export class DisponibilidadInvalida extends Error {
  constructor(message) {
    super(`Disponibilidad invalida: ${message}`);
  }
}

