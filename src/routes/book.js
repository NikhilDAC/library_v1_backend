import { Router } from "express";
import { addBook } from "../controller/bookController.js";
import { upload } from "../middleware/multer.js";

const bookRoutes=Router();
bookRoutes.route("/addBook").post(upload.single("cover_image"),addBook);

export{bookRoutes}