const ResponseFormatter = require("../core/ResponseFormatter");
const formatUserResponseData = require("../utils/formatUserResponseData");
const cloudinary = require("cloudinary").v2;
const UserService = require("../services/userService");

const userService = new UserService();

exports.getUser = async (req, res) =>
  ResponseFormatter.success(res, formatUserResponseData(req.user.toObject()));

exports.userUploadImage = async (req, res) => {
  const fileBuffer = req.file.buffer;

  const uploadResult = await new Promise((res, rej) => {
    cloudinary.uploader
      .upload_stream({}, (error, result) => {
        if (error) rej(error);
        else res(result);
      })
      .end(fileBuffer);
  });

  const user = req.user;
  user.image = uploadResult.secure_url;
  const userUpdated = await user.save();

  ResponseFormatter.success(res, { user: userUpdated }, null, 201);
};

exports.deleteUser = async (req, res) => {
  const user = req.user;
  user.deactiveate = true;

  await user.save();

  ResponseFormatter.success(res, null, null, 204);
};
