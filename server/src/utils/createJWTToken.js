import jwt from "jsonwebtoken";

export default (data, expiryDate = "90d") => {
  const token = jwt.sign(data, process.env.JWT_SECRET, {
    expiresIn: expiryDate,
  });

  return token;
};
