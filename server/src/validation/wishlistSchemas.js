const { default: z } = require("zod");

exports.wishlist = z.object({
  roomId: z.string().length(24, "Invalid Schema"),
});
