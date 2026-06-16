import { z } from "zod"
import { objectIdSchema, paginationQuery } from "./shared.js"

export const listarTurnosSchema = {
    params: z.object({
        id: objectIdSchema,
    }),
    query: z.object(paginationQuery),
}

export const crearPacienteSchema = {
    body: z.object({
        nombre: z.string().min(1),
        apellido: z.string().min(1),
        documento: z.string().min(1),
        obraSocial: z.object({
            nombre: z.string().min(1),
        }),
        plan: z.object({
            tipo: z.string().min(1),
        }),
    }),
}
