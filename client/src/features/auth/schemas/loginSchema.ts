import z from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .email("Invalid Email")
    .max(100, "Email is too long")
    .toLowerCase(),
  password: z
    .string()
    .min(8, "Password is too short")
    .max(75, "Password is too long")
    .trim(),
});

export type LoginTypes = z.infer<typeof loginSchema>;
