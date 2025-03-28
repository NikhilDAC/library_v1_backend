/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable("persons", (table) => {
    table.increments("id").primary();
    table.string("user_name", 50).notNullable().defaultTo("");
    table.string("full_name", 50).notNullable().defaultTo("");
    table.string("email").unique().notNullable();
    table.string("password").notNullable();
    table.enu("role", ["ADMIN", "USER"]).notNullable();
    table.string("phone_number").notNullable();
    table.boolean("account_status");
    table.string("refresh_token").defaultTo("");
    table.timestamps(true,true);
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable("persons");
}
