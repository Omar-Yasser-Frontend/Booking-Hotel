const jwt = require("jsonwebtoken");
const AppError = require("../core/AppError");

module.exports = (req, res, next) => {
  const accessToken = req.headers["authorization"]?.split(" ")[1];
  const refreshToken = req.cookies["refreshToken"];

  if (!accessToken && !refreshToken) throw new AppError("Not Authorized", 401);

  try {
    const decoded = jwt.verify(accessToken, secretKey);
    req.user = decoded.user;
    next();
  } catch (err) {
    if (!refreshToken) throw new AppError("Not Authorized", 401);

    const decoded = jwt.verify(refreshToken, secretKey);
    const newAccessToken = jwt.sign({ user: decoded.user }, secretKey, {
      expiresIn: "15m",
    });

    res.setHeader("Authorization", `Bearer ${newAccessToken}`);
    req.user = decoded.user;
    next();
  }
};
