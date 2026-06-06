import { z } from "zod"

export const objectIdSchema = z.string()

export const paginationQuery = {
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().default(10),
}
