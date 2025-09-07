const fs = require("fs");
const path = require("path");

const imagesURL = JSON.parse(
  fs.readFileSync(path.join(__dirname, "./rooms_image_url.json"), "utf-8")
);

const rooms = JSON.parse(
  fs.readFileSync(path.join(__dirname, "./hotel_rooms.json"), "utf-8")
);

const roomsFixedUrl = rooms.map((room, idx) => {
  let galleryLength = Math.floor(Math.random() * 6);
  if (galleryLength < 3) galleryLength = 3;

  return {
    ...room,
    thumbnail: imagesURL[idx],
    images: [
      imagesURL[idx],
      ...Array.from({ length: galleryLength }).map(
        () => imagesURL[Math.floor(Math.random() * imagesURL.length)]
      ),
    ],
  };
});

fs.writeFileSync(
  path.join(__dirname, "hotel.rooms.json"),
  JSON.stringify(roomsFixedUrl)
);

process.exit(0);
