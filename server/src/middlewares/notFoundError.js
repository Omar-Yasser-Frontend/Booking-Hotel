import AppError from "../core/AppError.js";

export default (req, res, next) => {
  throw new AppError(`Can't find ${req.originalUrl} in this server`, 404);
};
