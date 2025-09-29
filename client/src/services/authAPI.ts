import api from "../libs/api";

// User type based on server's formatUserResponseData and User model
export interface User {
  _id: string;
  username: string;
  email: string;
  role: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

// Generic API response type

export async function login(data: {
  email: string;
  password: string;
}): Promise<{ user: User }> {
  const res = await api.post("/auth/login", data);
  return res.data;
}

export async function signup(data: {
  username: string;
  email: string;
  password: string;
}): Promise<null> {
  const res = await api.post("/auth/signup", data);
  return res.data;
}

export async function confirmation(data: {
  userId: string;
  token: string;
}): Promise<null> {
  const res = await api.post("/auth/confirmation", data);
  return res.data;
}

export async function changePassword(data: {
  newPassword: string;
  currentPassword: string;
}): Promise<null> {
  const res = await api.post("/auth/change-password", data);
  return res.data;
}

export async function forgotPassword(data: { email: string }): Promise<null> {
  const res = await api.post("/auth/forgot-password", data);
  return res.data;
}

export async function resetPassword(data: {
  userId: string;
  token: string;
  password: string;
}): Promise<null> {
  const res = await api.post("/auth/reset-password", data);
  return res.data;
}

export async function logout(): Promise<null> {
  const res = await api.post("/auth/logout");

  return res.data;
}

export async function googleAuth(code: string): Promise<{ user: User }> {
  const res = await api.post(`/auth/google`, { code });

  return res.data;
}
