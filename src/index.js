// Write data base connetion code
import dbConfig from "../knexfile.js";
import { connectToDataBase } from "./db/db.js";
import { app } from "./app.js";

const port = process.env.PORT || 8000;

connectToDataBase()
  .then(() => {
    app.listen(() => "Server start on port ", port);
  })
  .catch((error) => {
    console.log(error.message);
  });
