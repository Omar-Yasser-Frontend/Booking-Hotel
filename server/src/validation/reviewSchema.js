const { default: z } = require("zod");

exports.review = z
  .object({
    roomId: z.string().length(24, "Invalid room id"),
    rating: z.number().min(1).max(5),
    comment: z.string().max(1000),
  })
  .strict();

exports.updateReview = z
  .object({
    rating: z.number().min(1).max(5),
    comment: z.string().max(1000),
  })
  .strict();
