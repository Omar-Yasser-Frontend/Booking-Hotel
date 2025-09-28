import AppError from "../core/AppError.js";
import AuthService from "../services/authService.js";

const authService = new AuthService();

export default async (decoded) => {
  const user = await authService.findById(decoded.userId, "User", true);
  if (!user) throw new AppError("Not Authorized", 401);

  return user;
};
