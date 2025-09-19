import AuthService from "../services/authService.js";

const authService = new AuthService();

export default async (decoded) => {
  const user = await authService.findById(decoded.userId, "User");

  return user;
};
