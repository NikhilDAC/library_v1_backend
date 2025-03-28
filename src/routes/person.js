import { Router } from "express";
import { registerAdmin } from "../controller/adminController.js";

const personRoutes=Router();

personRoutes.route("/register").post(registerAdmin);

export{personRoutes};