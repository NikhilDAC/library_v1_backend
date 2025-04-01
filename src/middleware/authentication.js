import jwt from "jsonwebtoken";
import { ApiError } from "../utils/APIError.js";
import { Person } from "../models/person.js";

const verifyToken = async function verifyJwt(req, _, next) {
  // intercept the requst
  // extract the token which is comming from the req. extract from cookies or header
  // verify it
  // find the user from id
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      throw new ApiError(403, "Invalid token");
    }
    const plainToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (!plainToken) {
      throw new ApiError("Can't get the access token from cookies");
    }
    if (plainToken.role == "ADMIN") {
      const personObj = await Person.query()
        .select("id", "user_name", "email", "role")
        .findById(plainToken?.id)
        .debug();

      // insert the object inside the request
      req.admin = personObj;
      next();
    } else {
      const personObj = await Person.query()
        .select("id", "user_name", "email", "role")
        .findById(plainToken?.id)
        .debug();

      // insert the object inside the request
      req.user = personObj;
      next();
    }
  } catch (error) {
    throw new ApiError(500, `Unauthorize Request:${error.message}`);
  }
};

export { verifyToken };
