import { z } from "zod"
import { objectIdSchema } from "./shared.js"

export const getUserNotificacionesSchema = {
    params: z.object({
        idUser: objectIdSchema,
    }),
    query: z.object({
        leidas: z.stringbool(),
    }),
}

export const verNotificacionSchema = {
    params: z.object({
        idUser: objectIdSchema,
        idNotificacion: z.coerce.number().int().positive(),
    }),
}
