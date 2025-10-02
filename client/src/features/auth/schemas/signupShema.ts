import z from "zod";

export const signupSchema = z
  .object({
    firstName: z
      .string()
      .min(3, "Name is to short")
      .max(50, "First name is too long")
      .trim(),
    lastName: z
      .string()
      .min(3, "Name is to short")
      .max(50, "Last name is too long")
      .trim(),
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

export type SignupTypes = z.infer<typeof signupSchema>;
