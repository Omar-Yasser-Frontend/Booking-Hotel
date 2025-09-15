const AuthService = require("../services/authService");

const authService = new AuthService();

module.exports = async (decoded) => {
  const user = await authService.findById(decoded.userId, "User");

  return user;
};
