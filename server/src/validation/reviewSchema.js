import z from "zod";

export const review = z
  .object({
    roomId: z.string().length(24, "Invalid room id"),
    rating: z.number().min(1).max(5),
    comment: z.string().max(1000),
  })
  .strict();

export const updateReview = z
  .object({
    rating: z.number().min(1).max(5),
    comment: z.string().max(1000),
  })
  .strict();
