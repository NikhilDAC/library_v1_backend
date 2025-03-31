// take the file from local server and upload on the cloudinery.
// import { v2 as cloudinery } from "cloudinary";
 import { v2 as cloudinary } from 'cloudinary'
import { CLOUD_NAME } from "../constant.js";
import { ApiError } from "./APIError.js";

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRECT,
});

// get the local file path from the multer

const uploadToCloudinery = async function imageUpload(localFilePath) {
  try {
    console.log("[info]: inside the upload to cloudinery function");

    if (!localFilePath) {
      throw new ApiError(403, "Local file path is empty can't find the image");
    }
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "image",

      overwrite: true,
    });
    // console.log(
    //   "[info] image upload to the cloudinary successfull..!!",
    //   response
    // );
    return response;
  } catch (error) {
    throw new ApiError(402, `Can't upload the image to cloud:${error.message}`);
  }
};

export{uploadToCloudinery}
