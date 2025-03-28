import knex from "knex";

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable("books", (table) => {
    table.increments("id").primary();
    table.string("book_name", 100).notNullable().defaultTo("");
    table.string("book_author", 100).notNullable().defaultTo("");
    table.decimal("book_price", 6, 2).notNullable().defaultTo(0.0);
    table.integer("quantity").notNullable().defaultTo(0);
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
export function down(knex){
    return knex.schema.dropTableIfExists("books")
}
