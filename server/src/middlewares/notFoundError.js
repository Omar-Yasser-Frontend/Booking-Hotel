const AppError = require("../core/AppError");

module.exports = (req, res, next) => {
  throw new AppError(`Can't find ${req.originalUrl} in this server`, 404);
};
