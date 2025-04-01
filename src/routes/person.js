import { Router } from "express";
import { registerAdmin } from "../controller/adminController.js";
import { login, logout } from "../controller/userController.js";
import { verifyToken } from "../middleware/authentication.js";
import { userRegister } from "../controller/userController.js";

const personRoutes = Router();

personRoutes.route("admin/register").post(registerAdmin);
personRoutes.route("admin/login").post(login);
personRoutes.route("admin/logout").post(verifyToken, logout);

// personRoutes.route("/user/register").post(userRegister);
// personRoutes.route("/login").post(login);
// personRoutes.route("/logout").post(verifyToken, logout);

export { personRoutes };
