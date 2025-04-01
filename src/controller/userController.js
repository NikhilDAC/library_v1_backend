import { Person } from "../models/person.js";
import { ApiError } from "../utils/APIError.js";
import { ApiResponse } from "../utils/APIResponse.js";
import { generateTokens } from "../utils/generateTokes.js";

const userRegister = async function register(req, res) {
  console.log(`[info]: inside register function`);

  try {
    const { user_name, full_name, email, password, phone_number } = req.body;
    console.log(
      `RequestData: ${user_name} ${full_name} ${email} ${password} ${phone_number}`
    );

    if (
      [user_name, full_name, email, password, phone_number].some(
        (field) => field.trim() === ""
      )
    ) {
      throw new ApiError(403, "Wrong inputs for register");
    }

    // check for duplicate user from database
    const person = await Person.query().findOne({ email: email }).debug();
    if (person) {
      throw new ApiError(403, "Same user found with same email id");
    }

    // // validate the images
    // console.log("File:", req.file);
    // // extract the local path

    // // // }
    // const locaPath = req.file?.path;
    // const cloudinaryResponse = "";
    // if (locaPath !== undefined) {
    //   cloudinaryResponse = await uploadToCloudinery(locaPath);
    //   console.log(cloudinaryResponse.url);
    // }

    // if request is coming throw admin then show the role at frontend

    // const adminData = await Person.query().findById(req.admin.id);
    // const assignRole = "";
    // const isAdminRequest = false;
    // if (adminData) {
    //   isAdminRequest = true;
    //   if (!req.body.role && req.body.role === "USER") {
    //     throw new ApiError(
    //       403,
    //       "Role field can't be empty.Plese provide the role"
    //     );
    //   }
    //   assignRole = req.body.role;
    // }

    // fire an insert query
    const response = await Person.query()
      .insert({
        user_name: user_name,
        full_name: full_name.toLowerCase(),
        email: email,
        password: req.body.password,
        role: "USER",
        phone_number: phone_number,
        // profile_image: cloudinaryResponse ? cloudinaryResponse.url : "",
        account_status: true,
        refresh_token: "",
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
const login = async function loginPerson(req, res) {
  // check user name and password
  // check user exits or not
  // create tokens and save refresh token inside database
  const { email, password } = req.body;
  console.log(`${email},${password}`);
  if (!email && !password) {
    throw new ApiError(403, "Invalid email or password");
  }

  const validatePerson = await Person.query().findOne({ email: email }).debug();
  if (!validatePerson) {
    throw new ApiError(403, "User not found with same email..");
  }
  const isPasswordValid = validatePerson.validatePassword(
    password,
    validatePerson.password
  );
  if (!isPasswordValid) {
    throw new ApiError(403, "Password is not matching with old password");
  }
  const tokens = await generateTokens(validatePerson.id);
  const newAccessToken = tokens.adminAccessToken;
  const newRefreshToken = tokens.adminRefreshToken;
  // send token to user in the cookie
  const options = {
    httpOnly: true,
    secure: true,
  };

  const body = {
    id: validatePerson.id,
    user_name: validatePerson.user_name,
    email: validatePerson.email,
    refresh_token: validatePerson.refresh_token,
  };
  return res
    .status(200)
    .cookie("accessToken", tokens.adminAccessToken, options)
    .cookie("refreshToken", tokens.adminRefreshToken, options)
    .json(
      new ApiResponse(203, "Login successfull", {
        user: body,
        newAccessToken,
        newRefreshToken,
      })
    );
};
const logout = async function logoutPerson(req, res) {
  // only login user can logout. This task is handle by the middleware
  // clear the cookies from the request and db also
  const options = {
    httpOnly: true,
    secure: true,
  };
  const response = await Person.query()
    .findById(req.user?.id)
    .patch({ refresh_token: "" })
    .debug();
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(402, "User logout successfully..", {}));
};

export { userRegister, login, logout };
