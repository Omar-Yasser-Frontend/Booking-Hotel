import z from "zod";

export const wishlist = z.object({
  roomId: z.string().length(24, "Invalid Schema"),
});
