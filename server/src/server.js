import "dotenv/config.js";
import connectDB from "./utils/db.js";
import app from "./app.js";

process.on("uncaughtException", (err) => {
  console.log("UNHANDLED EXCEPTION 🚀!");
  console.log(err.name, err.message);
  console.log(err.stack);

  process.exit(1);
});

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
