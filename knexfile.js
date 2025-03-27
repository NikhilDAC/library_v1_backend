// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
import { DB_NAME } from "./src/constant.js";
export default {

  development: {
    client: 'pg',
    connection: {
      database: DB_NAME || "library_management",
      user:     process.env.DATABASE_USER || "postgres",
      password: process.env.DATABASE_PASSWORD || "Root@123"
    },
    // pool: {
    //   min: 2,
    //   max: 10
    // },
    migrations: {
      tableName: 'knex_migrations',
      directory:"./src/db/migrations"
    },
    seeds: {
      tableName: 'knex_seed',
      directory:"./src/db/seeds"
    }
  },

  // staging: {
  //   client: 'postgresql',
  //   connection: {
  //     database: 'my_db',
  //     user:     'username',
  //     password: 'password'
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations'
  //   }
  // },

  // production: {
  //   client: 'postgresql',
  //   connection: {
  //     database: 'my_db',
  //     user:     'username',
  //     password: 'password'
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations'
  //   }
  // }

};
