import z from "zod";

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password is too short")
      .max(75, "Password is too long")
      .trim(),
    confirmPassword: z
      .string()
      .min(8, "Password is too short")
      .max(75, "Password is too long")
      .trim(),
  })
  .strict()
  .refine(
    (data) => data.password === data.confirmPassword,
    "Confirm password does not match password",
  );

export type ResetPasswordTypes = z.infer<typeof resetPasswordSchema>;
