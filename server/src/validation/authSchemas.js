const z = require("zod");

exports.createUser = z
  .object({
    username: z.string().trim().min(3).max(100),
    email: z.string().email().max(100).toLowerCase(),
    password: z.string().min(8).max(75).trim(),
  })
  .strict();

exports.login = z
  .object({
    email: z.string().email().max(100).toLowerCase(),
    password: z.string().min(8).max(75).trim(),
  })
  .strict();
