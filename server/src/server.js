// import mongoose from "mongoose";
// import app from "./app.js";

require("dotenv").config();
const connectDB = require("./utils/db");

process.on("uncaughtException", (err) => {
  console.log("UNHANDLED EXCEPTION 🚀!");
  console.log(err.name, err.message);

  process.exit(1);
});

const app = require("./app");

connectDB();

const server = app.listen(process.env.PORT, () =>
  console.log(`Server is running on http://localhost:${process.env.PORT}`)
);

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION 🚀!");
  console.log(err.name, err.message);

  server.close(() => {
    process.exit(1);
  });
});
