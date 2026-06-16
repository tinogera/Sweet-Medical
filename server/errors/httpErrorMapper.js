import { ZodError } from "zod"
import { BadRequestError, NotFoundError, ConflictError, UnprocessableEntityError } from './AppErrors.js'
import { TurnoInvalido, TurnoNoPuedeCambiarEstado, BloqueHorarioInexistente } from '../domain/turnos/excepcion.turno.js'
import { DisponibilidadInvalida } from '../domain/personas/excepcion.persona.js'
import { ServicioInexistente } from '../domain/servicios/excepcion.servicio.js'
import { NotificacionInexistente } from '../domain/notificaciones/excepcion.notificacion.js'

export function toHttpError(error) {
    if (error instanceof ZodError) return { status: 400, message: "Validation Error", details: error.issues.map(i => ({ path: i.path.join("."), message: i.message })) }
    if (error instanceof BadRequestError) return { status: 400, message: error.message }
    if (error instanceof RangeError) return { status: 400, message: error.message }
    if (error instanceof NotFoundError) return { status: 404, message: error.message }
    if (error instanceof ConflictError) return { status: 409, message: error.message }
    if (error instanceof UnprocessableEntityError) return { status: 422, message: error.message }
    if (error instanceof TurnoInvalido) return { status: 422, message: error.message }
    if (error instanceof TurnoNoPuedeCambiarEstado) return { status: 422, message: error.message }
    if (error instanceof DisponibilidadInvalida) return { status: 422, message: error.message }
    if (error instanceof BloqueHorarioInexistente) return { status: 404, message: error.message }
    if (error instanceof ServicioInexistente) return { status: 404, message: error.message }
    if (error instanceof NotificacionInexistente) return { status: 404, message: error.message }
    return { status: 500, message: "Error interno del servidor" }
}
