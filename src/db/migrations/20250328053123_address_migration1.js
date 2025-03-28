/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable("addresses", (table) => {
    table.increments("id").primary();
    table.string("street_name", 30).notNullable().defaultTo("");
    table.string("city", 30).notNullable().defaultTo("");
    table.string("state", 40).notNullable().defaultTo("");
    table.string("country", 30).notNullable().defaultTo("");
    table.string("zipcode", 10).notNullable().defaultTo("");
    table
      .integer("person_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("persons")
      .onDelete("CASCADE");
    table.timestamps(true,true);  
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTableIfExists("addresses");
}
