import z from "zod";

export const createUser = z
  .object({
    username: z.string().trim().min(3).max(100),
    email: z.string().email().max(100).toLowerCase(),
    password: z.string().min(8).max(75).trim(),
  })
  .strict();

export const login = z
  .object({
    email: z.string().email().max(100).toLowerCase(),
    password: z.string().min(8).max(75).trim(),
  })
  .strict();

export const accountVerify = z.object({
  userId: z.string().length(24, "Invalid user id"),
  token: z.string().length(64, "Invalid token"),
});

export const forgotPassword = z.object({
  email: z.string().email().max(100).toLowerCase(),
});

export const resetPassword = z.object({
  userId: z.string().length(24, "Invalid user id"),
  token: z.string().length(64, "Invalid token"),
  password: z.string().min(8).max(75),
});

export const changePassword = z.object({
  currentPassword: z.string().min(8).max(75),
  newPassword: z.string().min(8).max(75),
});

export const updateMe = z.object({
  username: z.string().trim().min(3).max(100),
});
