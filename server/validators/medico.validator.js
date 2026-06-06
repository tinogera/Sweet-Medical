import { z } from "zod"
import { objectIdSchema } from "./shared.js"

export const agregarDisponibilidadSchema = {
    params: z.object({
        id: objectIdSchema,
    }),
    body: z.object({
        fecha: z.string().min(1),
        horaInicio: z.string().min(1),
        horaFin: z.string().min(1),
        sedeName: z.string().min(1),
    }),
}

export const obtenerDisponibilidadSchema = {
    params: z.object({
        id: objectIdSchema,
    }),
    query: z.object({
        sede: z.string().optional(),
    }),
}

export const eliminarDisponibilidadSchema = {
    params: z.object({
        id: objectIdSchema,
        bloqueId: objectIdSchema,
    }),
}
