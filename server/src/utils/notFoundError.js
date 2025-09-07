const AppError = require("./AppError");

module.exports = (res, req, next) => {
  throw new AppError("Route Not Found", 404);
};
