const crypto = require("crypto");
const AppError = require("../core/AppError");
const sendEmail = require("../utils/sendEmail");
const cryptoToken = require("../utils/cryptoToken");
const setAuthTokens = require("../utils/authTokens");
const AuthService = require("../services/authService");
const ResponseFormatter = require("../core/ResponseFormatter");
const formatUserResponseData = require("../utils/formatUserResponseData");

const authService = new AuthService();

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.findUserByEmail(email, password);

  if (!user.isActive)
    throw new AppError("Please confirm your email before logging in", 403);

  setAuthTokens(res, user);

  ResponseFormatter.success(res, formatUserResponseData(user));
};

exports.signup = async (req, res) => {
  const { token, hashedToken } = cryptoToken();

  const user = await authService.create({
    ...req.body,
    role: "user",
    isActive: false,
    confirmationToken: {
      token: hashedToken,
      expiresAt: 60 * 15 * 1000 + Date.now(),
    },
  });

  sendEmail(
    `${process.env.CLIENT_URL}/confirmation?token=${token}&userId=${user._id}`
  );

  console.log(token);

  ResponseFormatter.success(
    res,
    null,
    "Check your email to confirm your account",
    201
  );
};

exports.confirmUser = async (req, res) => {
  const { token, userId } = req.body;
  const user = await authService.findById(userId, "user");
  const hashToken = crypto.createHash("sha256").update(token).digest("hex");

  if (user.confirmationToken.expiresAt < Date.now())
    throw new AppError("Token Expired", 400);

  if (hashToken !== user.confirmationToken.token)
    throw new AppError("Invalid magic link", 403);

  user.isActive = true;
  user.confirmationToken = undefined;
  user.save();

  setAuthTokens(res, user);

  ResponseFormatter.success(res, null, "Account verified", 200);
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await authService.findOne({ email }, "user");
  const { token, hashedToken } = cryptoToken();

  user.resetPassword.token = hashedToken;
  user.resetPassword.expiresAt = Date.now() + 60 * 15 * 1000;
  await user.save();

  sendEmail(
    `${process.env.CLIENT_URL}/reset-password?token=${token}&userId=${user._id}`
  );

  ResponseFormatter.success(res, null, "Check your email to reset password");
};

exports.resetPassword = async (req, res) => {
  const { token, userId, password } = req.body;
  const user = await authService.findById(userId, "user");
  const hashToken = crypto.createHash("sha256").update(token).digest("hex");

  if (user.resetPassword.expiresAt < Date.now())
    throw new AppError("Token Expired", 400);

  if (hashToken !== user.resetPassword.token)
    throw new AppError("Invalid magic link", 403);

  user.password = password;
  user.resetPassword = undefined;
  await user.save();

  ResponseFormatter.success(
    res,
    null,
    "Password changed successfully, please login",
    200
  );
};

exports.changePassword = async (req, res) => {
  const { userId } = req.user;
  const { currentPassword, newPassword } = req.body;
  const user = await authService.findById(userId, "user");

  if (!(await user.comparePassword(currentPassword)))
    throw new AppError("Invalid Password", 403);

  user.password = newPassword;
  await user.save();

  ResponseFormatter.success(res, null, "Password changed successfully", 200);
};

exports.logout = (req, res) => {
  res.clearCookie("refreshToken");

  ResponseFormatter.success(res, null, null, 204);
};
