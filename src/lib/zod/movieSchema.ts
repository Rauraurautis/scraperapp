import { z } from "zod"

export const movieSchema = z.object({
    option: z.string().min(2)
})