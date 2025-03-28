// Write data base connetion code

import { connectToDataBase } from "./src/db/db.js";
import { app } from "./src/app.js";

const port = process.env.PORT || 8000;

connectToDataBase()
  .then((response) => {
    app.listen(port,() => {
      console.log(`Server start on port ${port}`);
      
    });
  })
  .catch((error) => {
    console.log(error.message);
  });
