import { AppError } from "../errors/AppErrors.js"

export function errorHandler(err, _req, res, next) {
    if (res.headersSent) {
        return next(err)
    }

    if (err instanceof AppError) {
        const body = {
            status: err.status,
            message: err.message,
            timestamp: err.timestamp,
        }
        if (err.details) body.details = err.details
        return res.status(err.statusCode).json(body)
    }

    console.error("Error no manejado:\n", err)

    return res.status(500).json({
        status: "error",
        message: "Error interno del servidor",
        timestamp: new Date().toISOString(),
    })
}