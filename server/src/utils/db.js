const mongoose = require("mongoose");

module.exports = () =>
  mongoose
    .connect(process.env.MoNGODB_URI)
    .then(() => {
      console.log("Database connected successfully...");
    })
    .catch((err) => {
      console.log("Error: Failed to connect to database 💔");
      console.log(err);
      process.exit(1);
    });
