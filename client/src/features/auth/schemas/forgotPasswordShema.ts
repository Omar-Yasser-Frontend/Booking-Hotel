import z from "zod";

export const forgotPswrdShema = z.object({
  email: z
    .string()
    .email("Invalid Email")
    .max(100, "Email is too long")
    .toLowerCase(),
});

export type forgotPswrdTypes = z.infer<typeof forgotPswrdShema>;
