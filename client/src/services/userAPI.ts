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

export async function getUser(): Promise<{ user: User }> {
  const res = await api.get("/user");
  return res.data;
}

export async function uploadProfilePic(
  data: FormData
): Promise<{ user: User }> {
  const res = await api.post("/user/upload-profile-image", data);
  return res.data;
}

export async function deleteUser(): Promise<null> {
  const res = await api.delete("/user/delete-account");
  return res.data;
}
