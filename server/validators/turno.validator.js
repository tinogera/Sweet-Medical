import { z } from "zod"
import { objectIdSchema } from "./shared.js"

export const actualizarTurnoSchema = {
    params: z.object({
        id: objectIdSchema,
    }),
    body: z.object({
        estado: z.enum(["RESERVADO", "CANCELADO", "CONFIRMADO", "REALIZADO"]),
        responsableId: z.string().optional(),
        rol: z.enum(["PACIENTE", "MEDICO"]).optional(),
        motivo: z.string().min(1).optional(),
    }),
}

export const generarTurnosSchema = {
    body: z.object({}).optional(),
}
