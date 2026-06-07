import { z } from "zod"
import { objectIdSchema } from "./shared.js"

export const agregarDisponibilidadSchema = {
    params: z.object({
        id: objectIdSchema,
    }),
    body: z.object({
        fecha: z.iso.date(),
        horaInicio: z.iso.time(),
        horaFin: z.iso.time(),
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
