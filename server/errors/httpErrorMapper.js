import { BadRequestError, NotFoundError, ConflictError, UnprocessableEntityError } from './AppErrors.js'

export function toHttpError(error) {
    if (error instanceof BadRequestError) return { status: 400, message: error.message }
    if (error instanceof NotFoundError) return { status: 404, message: error.message }
    if (error instanceof ConflictError) return { status: 409, message: error.message }
    if (error instanceof UnprocessableEntityError) return { status: 422, message: error.message }
    return { status: 500, message: "Error interno del servidor" }
}
