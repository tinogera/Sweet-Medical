export class TurnoInvalido extends Error {
  constructor(message) {
    super(message);
  }
}

export class TurnoNoPuedeCambiarEstado extends Error {
  constructor(message) {
    super(message);
  }
}

export class BloqueHorarioInexistente extends Error {
  constructor(bloqueId) {
    super(`Bloque con id ${bloqueId} no encontrado en la agenda`);
  }
}



