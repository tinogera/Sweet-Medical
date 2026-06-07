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
        fechaDesde: z.iso.date().optional(),
        fechaHasta: z.iso.date().optional(),
    }),
}
