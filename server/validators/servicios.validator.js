import { z } from "zod"
import { objectIdSchema } from "./shared.js"

export const listarPorMedicoSchema = {
    params: z.object({
        id: objectIdSchema,
    }),
}

export const agregarAMedicoSchema = {
    params: z.object({
        id: objectIdSchema,
    }),
    body: z.object({
        tipoServicio: z.string().min(1),
        nombre: z.string().min(1),
        precio: z.number().positive(),
        duracion: z.number().int().positive(),
    }),
}

export const eliminarSchema = {
    params: z.object({
        id: objectIdSchema,
        nombre: z.string().min(1),
    }),
}

export const actualizarSchema = {
    params: z.object({
        id: objectIdSchema,
        nombre: z.string().min(1),
    }),
    body: z.object({
        precio: z.number().positive().optional(),
        duracion: z.number().int().positive().optional(),
    }),
}
