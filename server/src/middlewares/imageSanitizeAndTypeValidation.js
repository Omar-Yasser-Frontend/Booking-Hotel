const fileType = require("file-type");
const sharp = require("sharp");
const AppError = require("../core/AppError");

module.exports = async (req, res, next) => {
  if (!req.file || !req.file.buffer)
    throw new AppError("No file uploaded", 400);

  const type = await fileType.fileTypeFromBuffer(req.file.buffer);
  if (!type) throw new AppError("Unsupported or unknown file type", 400);

  if (!type.mime.startsWith("image/"))
    throw new AppError("Invalid input file", 400);

  if (type.mime === "image/svg+xml") {
    throw new AppError("SVG not allowed; upload a raster image (png/jpg)", 400);
  }

  const safeBuffer = await sharp(req.file.buffer)
    .rotate()
    .resize({ width: 2000, withoutEnlargement: true })
    .toBuffer();

  req.file.buffer = safeBuffer;

  return next();
};
