const sendCookie = require("../utils/sendCookie");
const createJWTToken = require("../utils/createJWTToken");

module.exports = (res, user) => {
  sendCookie(
    res,
    "refreshToken",
    createJWTToken({ userId: user._id, email: user.email })
  );

  res.setHeader(
    "authorization",
    `Bearer ${createJWTToken({ userId: user._id, email: user.email })}`
  );
};
