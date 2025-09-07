const fs = require("fs");
const path = require("path");

let result = JSON.parse(
  fs.readFileSync(path.join(__dirname, "hotel.rooms.json"), "utf-8")
);

result = result.map((room) => ({ ...room, rating: 0, reviewsCount: 0 }));

fs.writeFileSync(
  path.join(__dirname, "hotel.rooms.json"),
  JSON.stringify(result)
);
