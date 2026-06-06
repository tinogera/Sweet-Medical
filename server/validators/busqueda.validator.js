import { z } from "zod"
import { paginationQuery } from "./shared.js"

export const buscarTurnosSchema = {
    query: z.object({
        idPaciente: z.string().min(1),
        ...paginationQuery,
        ordenarPor: z.enum(["fecha", "costo"]).default("fecha"),
        direccion: z.enum(["asc", "desc"]).default("asc"),
        profesional: z.string().optional(),
        especialidad: z.string().optional(),
        practica: z.string().optional(),
        sede: z.string().optional(),
        fechaDesde: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Formato de fecha inválido (YYYY-MM-DD)").optional(),
        fechaHasta: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Formato de fecha inválido (YYYY-MM-DD)").optional(),
    }),
}
