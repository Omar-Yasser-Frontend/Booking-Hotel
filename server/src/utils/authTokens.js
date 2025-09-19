import sendCookie from "../utils/sendCookie.js";
import createJWTToken from "../utils/createJWTToken.js";

export default (res, user) => {
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
