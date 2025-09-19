const cookieConfig = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  maxAge: 1000 * 60 * 60 * 24 * 30,
};

export default (res, name, data, additionalConfig = {}) => {
  res.cookie(name, data, {
    ...cookieConfig,
    ...additionalConfig,
    ...(process.env.NODE_ENV === "production" ? { partitioned: true } : {}),
  });
};
