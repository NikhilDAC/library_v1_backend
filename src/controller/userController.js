import { Person } from "../models/person.js";
import { ApiError } from "../utils/APIError.js";
import { ApiResponse } from "../utils/APIResponse.js";

const userRegister = async function register(req, res) {
  console.log(`[info]: inside register function`);

  try {
    const {
      user_name,
      full_name,
      email,
      password,
      phone_number,
      account_status,
    } = req.body;
    console.log(
      `RequestData: ${user_name} ${full_name} ${email} ${password} ${phone_number} ${account_status}`
    );

    if (
      [
        user_name,
        full_name,
        email,
        password,
        phone_number,
        account_status,
      ].some((field) => field.trim() === "")
    ) {
      throw new ApiError(403, "Wrong inputs for register");
    }

    // check for duplicate user from database
    const person = await Person.query().findOne({ email: email }).debug();
    if (person) {
      throw new ApiError(403, "Same user found with same email id");
    }

    // validate the images
    console.log("File:", req.file);
    // extract the local path

    // // }
    const locaPath = req.file?.path;
    const cloudinaryResponse = "";
    if (locaPath !== undefined) {
      cloudinaryResponse = await uploadToCloudinery(locaPath);
      console.log(cloudinaryResponse.url);
    }

    // fire an insert query
    const response = await Person.query()
      .insert({
        user_name: user_name,
        full_name: full_name,
        email: email,
        password: req.body.password,
        role: "USER",
        phone_number: phone_number,
        profile_image: cloudinaryResponse ? cloudinaryResponse.url : "",
        account_status: account_status,
      })
      .select("id", "user_name", "full_name", "password", "phone_number");
    if (!response) {
      throw new ApiError(403, `Can't insert the record:`);
    }
    return res.status(200).json(
      new ApiResponse(200, "Registraction successfull", {
        id: response.id,
        user_name: response.user_name,
        full_name: response.full_name,
        email: response.email,
      })
    );
  } catch (error) {
    throw new ApiError(
      500,
      `Something went wrong while inserting user record:${error.message}`
    );
  }
};


export{userRegister}
