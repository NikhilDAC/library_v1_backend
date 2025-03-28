import knex from "knex";

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable("book_records", (table) => {
    table
      .integer("person_id")
      .references("id")
      .inTable("persons")
      .notNullable()
      .unsigned()
      .primary()
      .onDelete("CASCADE");
    table.date("issue_date").notNullable();
    table.date("expire_date").notNullable();
    table.decimal("book_fine", 8, 2).defaultTo(0.0);
    table.integer("number_of_issu_books").defaultTo(0).checkBetween([0, 4]);
    table.timestamps(true,true);
  });
}
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTableIfExists("book_records");
}
