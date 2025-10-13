import api from "../libs/api";

// User type based on server's formatUserResponseData and User model
export interface User {
  _id: string;
  username: string;
  email: string;
  role: string;
  image: string | null;
  createdAt: string;
  updatedAt: string;
}

export async function getMe(): Promise<{ user: User } | null> {
  const res = await api.get("/user/me");

  return res.data;
}

export async function updateMe(data: {
  username: string;
}): Promise<{ user: User }> {
  const res = await api.put("/user/me", data);
  return res.data;
}

export async function uploadMeImage(data: FormData): Promise<{ user: User }> {
  const res = await api.post("/user/me/image", data);
  return res.data;
}

export async function deleteMe(): Promise<null> {
  const res = await api.delete("/user/me");
  return res.data;
}
