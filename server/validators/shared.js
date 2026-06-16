import { z } from "zod"

export const objectIdSchema = z.string()

export const paginationQuery = {
    pagina: z.coerce.number().int().positive().default(1),
    limite: z.coerce.number().int().positive().default(10),
}
