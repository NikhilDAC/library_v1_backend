import { Person } from "../models/person.js";
import { ApiError } from "./APIError.js";

const generateTokens = async function generateAccessTokenAndRefreshToken(id) {
  // get user from id
  // use inbuild method to generate tokens
  try {
    console.log("[info]: inside the generate Token method");

    const response = await Person.query().findById(id).debug();
    if (!response) {
      throw new ApiError(403, "User not found with given id..");
    }
    const adminAccessToken = response.generateAccessToken();
    const adminRefreshToken = response.generateRefreshToken();
    const refreshToken = (response.refresh_token = adminRefreshToken);

    await Person.query()
      .findById(id)
      .patch({ refresh_token: refreshToken })
      .debug();

    return { adminAccessToken, adminRefreshToken };
  } catch (error) {
    throw new ApiError(403, `Error While generating token:${error.message} `);
  }
};

export { generateTokens };
