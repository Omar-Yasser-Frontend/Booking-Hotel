import crypto from "crypto";
import AppError from "../core/AppError.js";
import cryptoToken from "../utils/cryptoToken.js";
import setAuthTokens from "../utils/authTokens.js";
import AuthService from "../services/authService.js";
import ResponseFormatter from "../core/ResponseFormatter.js";
import formatUserResponseData from "../utils/formatUserResponseData.js";
import sendEmail from "../libs/sendEmails.js";
import templateInjection from "../utils/templateInjection.js";
import fs from "fs";
import path from "path";
import getGoogleUserInfo from "../utils/googleOAuthClient.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const authService = new AuthService();
const confirmEmailTemp = fs.readFileSync(
  path.join(__dirname, "..", "templates", "confirmEmail.html"),

  "utf-8"
);
const resetPasswordTemp = fs.readFileSync(
  path.join(__dirname, "..", "templates", "resetPassword.html"),
  "utf-8"
);

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.findUserByEmail(email, password);

  if (!user.isActive) {
    const { token, hashedToken } = cryptoToken();

    user.confirmationToken = {
      token: hashedToken,
      expiresAt: 60 * 15 * 1000 + Date.now(),
    };
    await user.save();

    sendEmail(
      user.email,
      "Confirm your account",
      templateInjection(confirmEmailTemp, {
        "{{name}}": user.username,
        "{{year}}": new Date().toISOString(),
        "{{confirmLink}}": `${process.env.CLIENT_URL}/reset-password?token=${token}&userId=${user._id}`,
      })
    );
    throw new AppError("Please confirm your email before logging in", 403);
  }

  setAuthTokens(res, user);

  ResponseFormatter.success(res, { user: formatUserResponseData(user) });
};

export const signup = async (req, res) => {
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
    user.email,
    "Confirm your account",
    templateInjection(confirmEmailTemp, {
      "{{name}}": user.username,
      "{{year}}": new Date().toISOString(),
      "{{confirmLink}}": `${process.env.CLIENT_URL}/reset-password?token=${token}&userId=${user._id}`,
    })
  );

  ResponseFormatter.success(
    res,
    null,
    "Check your email to confirm your account",
    201
  );
};

export const confirmUser = async (req, res) => {
  const { token, userId } = req.body;
  const user = await authService.findById(userId, "user");
  const hashToken = crypto.createHash("sha256").update(token).digest("hex");

  if (!user.confirmationToken) throw new AppError("User already verified", 403);

  if (user.confirmationToken.expiresAt < Date.now())
    throw new AppError("Token Expired", 403);

  if (hashToken !== user.confirmationToken.token)
    throw new AppError("Invalid magic link", 403);

  user.isActive = true;
  user.confirmationToken = undefined;
  user.save();

  setAuthTokens(res, user);

  ResponseFormatter.success(res, null, "Account verified", 200);
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await authService.findOne({ email }, "user", true);
  const { token, hashedToken } = cryptoToken();

  if (!user)
    return ResponseFormatter.success(
      res,
      null,
      "Check your email to reset password"
    );

  user.resetPassword.token = hashedToken;
  user.resetPassword.expiresAt = Date.now() + 60 * 15 * 1000;
  await user.save();

  sendEmail(
    user.email,
    "Reset your password",
    templateInjection(resetPasswordTemp, {
      "{{name}}": user.username,
      "{{year}}": new Date().toISOString(),
      "{{resetLink}}": `${process.env.CLIENT_URL}/reset-password?token=${token}&userId=${user._id}`,
    })
  );

  ResponseFormatter.success(res, null, "Check your email to reset password");
};

export const resetPassword = async (req, res) => {
  const { token, userId, password } = req.body;
  const user = await authService.findById(userId, "user", true);
  const hashToken = crypto.createHash("sha256").update(token).digest("hex");

  if (!user) throw new AppError("Something went wrong", 500);

  if (user.resetPassword.expiresAt < Date.now())
    throw new AppError("Token Expired", 403);

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

export const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const user = req.user;

  if (!(await user.comparePassword(currentPassword)))
    throw new AppError("Invalid Password", 403);

  user.password = newPassword;
  await user.save();

  ResponseFormatter.success(res, null, "Password changed successfully", 200);
};

export const logout = (req, res) => {
  res.clearCookie("refreshToken");

  ResponseFormatter.success(res, null, null, 204);
};

export const googleAuth = async (req, res) => {
  const {
    email,
    name: username,
    picture: image,
  } = await getGoogleUserInfo(req.body.code);
  let user = await authService.findOne({ email: email }, "user", true);

  if (!user)
    user = await authService.create({
      isActive: true,
      role: "user",
      username,
      email,
      image,
    });

  setAuthTokens(res, user);

  ResponseFormatter.success(res, { user: formatUserResponseData(user) });
};
