import { Router } from "express";
import { registerAdmin } from "../controller/adminController.js";
import { login } from "../controller/userController.js";

const personRoutes=Router();

personRoutes.route("/register").post(registerAdmin);
personRoutes.route("/login").post(login)

export{personRoutes};