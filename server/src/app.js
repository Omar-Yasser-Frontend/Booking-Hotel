const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const mongoSanititze = require("express-mongo-sanitize");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");

const roomRouter = require("./routes/rooms");
const reviewsRouter = require("./routes/reviews");
const wishlistRouter = require("./routes/wishlist");
const userRouter = require("./routes/user");
const authRouter = require("./routes/auth");
const paymentRouter = require("./routes/payment");
const webhookRouter = require("./routes/webhook");
const reservationRouter = require("./routes/reservations");
const notFoundError = require("./middlewares/notFoundError");
const ResponseFormatter = require("./core/ResponseFormatter");
const globalErrorHandler = require("./middlewares/globalErrorHandler");

const app = express();

app.set("query parser", "extended");
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
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
module.exports = app;
