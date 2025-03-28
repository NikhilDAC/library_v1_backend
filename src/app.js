import express from "express";
import cors from "cors";
import cookie from "cookie-parser";
import cookieParser from "cookie-parser";

const app = express();
// enable the json data
app.use(express.json({ limit: "16kb" }));

// enable the url data
app.use(express.urlencoded({ limit: "16kb", extended: true }));

// enable the cors
app.use(cors({ origin: process.env.CORS_ORIGIN }));

// enable the cookie
app.use(cookieParser());

export { app };
