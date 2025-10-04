import ResponseFormatter from "../core/ResponseFormatter.js";
import formatUserResponseData from "../utils/formatUserResponseData.js";
import cloudinary from "cloudinary";
import UserService from "../services/userService.js";

const cloundinaryV2 = cloudinary.v2;

const userService = new UserService();

export const getMe = async (req, res) =>
  ResponseFormatter.success(res, {
    user: formatUserResponseData(req.user.toObject()),
  });

export const UploadMeImage = async (req, res) => {
  const fileBuffer = req.file.buffer;

  const uploadResult = await new Promise((res, rej) => {
    cloundinaryV2.uploader
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

export const deleteMe = async (req, res) => {
  const user = req.user;
  user.deactiveate = true;

  await user.save();

  ResponseFormatter.success(res, null, null, 204);
};
