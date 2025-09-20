import { ZodError } from "zod";
import AppError from "../core/AppError.js";
import ResponseFormatter from "../core/ResponseFormatter.js";

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

const handleValdationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((err) => err.message);

  const message = `Invalid Input data: ${errors.join(", ")}`;
  return new AppError(message, 400);
};

const handleDuplicateFieldDB = (err) => {
  const value = err.keyValue.name;
  const message = `Duplicate Fields Value: ${value}. Please use another value`;
  return new AppError(message, 403);
};

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  console.log(err);
  if (err?.isOperational) {
    if (err.statusCode < 500) {
      return ResponseFormatter.fail(res, err.message, null, err.statusCode);
    }

    return ResponseFormatter.error(res, err.message, err.statusCode, null);
  } else {
    console.error("ERROR 💥", err);

    return ResponseFormatter.error(res, "Something went wrong", 500);
  }
};

function handleJWTToken(err) {
  return new AppError("Invalid Token", 401);
}

function handleZodError(err) {
  return new AppError("Malformed Inputs", 400);
}

const TokenExpiration = (err) =>
  new AppError("Session expired please login again", 401);

export default (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else {
    if (err.name === "CastError") err = handleCastErrorDB(err);
    if (err.code === 11000) err = handleDuplicateFieldDB(err);
    if (err.name === "ValidationError") err = handleValdationErrorDB(err);
    if (err.name === "JsonWebTokenError") err = handleJWTToken(err);
    if (err.name === "TokenExpiredError") err = TokenExpiration(err);
    if (err instanceof ZodError) err = handleZodError(err);

    sendErrorProd(err, res);
  }
};
