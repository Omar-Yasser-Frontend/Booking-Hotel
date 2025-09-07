const mongoose = require("mongoose");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");

dotenv.config();

mongoose.connect(process.env.MONGODB_URI).then(async () => {
  const roomSchema = new mongoose.Schema({}, { strict: false });
  const RoomsModel = mongoose.model("rooms", roomSchema);
  console.log("Database connected successfully...");
  if (process.argv.includes("--clear")) {
    const result = await RoomsModel.deleteMany();
  }

  if (process.argv.includes("--populate")) {
    console.log(process.argv.includes("--populate"));
    const result = fs.readFileSync(
      path.join(__dirname, "./hotel.rooms.json"),
      "utf-8"
    );
    const data = await RoomsModel.create(JSON.parse(result));
  }
  process.exit(0);
});
