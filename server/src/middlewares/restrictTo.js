import AppError from "../core/AppError.js";

export default (roles) => (req, res, next) => {
  if (!req.user)
    throw new AppError("Not Authorized to perform this action", 401);
  if (!roles.includes(req.user?.role))
    throw new AppError(
      "Only Admin can add, update or delete his own rooms",
      403
    );

  next();
};
