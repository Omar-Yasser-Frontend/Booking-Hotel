import z from "zod";

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(8).max(75),
  newPassword: z.string().min(8).max(75),
  confirmPassword: z.string().min(8).max(75),
});

export type ChangePasswordType = z.infer<typeof changePasswordSchema>;
