import { Router } from "express";
import { login, logout, userRegister } from "../controller/userController.js";
import { verifyToken } from "../middleware/authentication.js";

const userRoutes = Router();

userRoutes.route("/register").post(userRegister);
userRoutes.route("/login").post(login);
userRoutes.route("/logout").post(verifyToken, logout);

export { userRoutes };
