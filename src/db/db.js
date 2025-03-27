import Knex  from "knex";
import { Model } from "objection";
import dbConfig from "../../knexfile.js";

async function connectToDataBase() {
  try {
    console.log("[info]: inside the conncect to database");

    const knex = await Knex(dbConfig.development);
    Model.knex(knex);
    console.log("[info]:  conncect to database successfully ");
  } catch (error) {
    console.log("[error]", error.message);
  }
}

export{connectToDataBase}
