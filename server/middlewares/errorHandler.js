export function errorHandler(err, _req, res, next) {
    if (res.headersSent) {
        return next(err)
    }

    if (process.env.ENV === "dev") {
        console.error("Error no manejado:\n", err)
    }

    return res.status(500).json({
        message: "Error interno del servidor",
    })
}