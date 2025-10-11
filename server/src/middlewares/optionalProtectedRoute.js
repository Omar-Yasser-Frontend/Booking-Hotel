import jwt from "jsonwebtoken";
import AppError from "../core/AppError.js";
import getUserProtectedRoutes from "../utils/getUserProtectedRoutes.js";
import createJWTToken from "../utils/createJWTToken.js";

export default async (req, res, next) => {
  const accessToken = req.headers["authorization"]?.split(" ")[1];
  const refreshToken = req.cookies["refreshToken"];

  if (!accessToken || !refreshToken) next();

  try {
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);

    const user = await getUserProtectedRoutes(decoded);

    if (user.passwordChangeDate(decoded.iat)) {
      res.clearCookie("refreshToken");
      next();
    }

    req.user = user;
    next();
  } catch (err) {
    if (!refreshToken || err.name !== "TokenExpiredError") next();

    try {
      const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
      const newAccessToken = createJWTToken(decoded, "15m");

      const user = await getUserProtectedRoutes(decoded);
      if (user.passwordChangeDate(decoded.iat)) {
        res.clearCookie("refreshToken");
        next();
      }

      res.setHeader("Authorization", `Bearer ${newAccessToken}`);
      req.user = user;
      next();
    } catch (err) {
      next();
    }
  }
};
