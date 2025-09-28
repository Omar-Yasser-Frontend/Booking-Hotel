import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import mongoSanititze from "express-mongo-sanitize";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import hpp from "hpp";

import roomRouter from "./routes/rooms.js";
import reviewsRouter from "./routes/reviews.js";
import wishlistRouter from "./routes/wishlist.js";
import userRouter from "./routes/user.js";
import authRouter from "./routes/auth.js";
import paymentRouter from "./routes/payment.js";
import webhookRouter from "./routes/webhook.js";
import reservationRouter from "./routes/reservations.js";
import notFoundError from "./middlewares/notFoundError.js";
import ResponseFormatter from "./core/ResponseFormatter.js";
import globalErrorHandler from "./middlewares/globalErrorHandler.js";

const app = express();

app.set("query parser", "extended");
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    exposedHeaders: ["Authorization"],
  })
);

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 500,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    ipv6Subnet: 56,
  })
);

app.use(helmet());

app.use(cookieParser());

// allow modifing query property in req object
// to prevent errors in mongoSanitize library and better query for mongoose
app.use((req, res, next) => {
  Object.defineProperty(req, "query", {
    ...Object.getOwnPropertyDescriptor(req, "query"),
    value: req.query,
    writable: true,
  });
  next();
});

app.use(hpp());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.get("/", (req, res) => {
  ResponseFormatter.success(res, null, "Welcome to my Hotel App", 200);
});

app.use("/api/v1/webhook", webhookRouter);

app.use(express.json({ limit: "10kb" }));

app.use(mongoSanititze());

app.use("/api/v1/room", roomRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/review", reviewsRouter);
app.use("/api/v1/wishlist", wishlistRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/payment", paymentRouter);
app.use("/api/v1/reservation", reservationRouter);

app.all(/(.*)/, notFoundError);

app.use(globalErrorHandler);

// for testing and seperating express configuration from server
export default app;
