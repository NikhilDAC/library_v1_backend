/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable("borrowed_books", (table) => {
    table.increments("id").primary();
    table
      .integer("person_id")
      .notNullable()
      .unsigned()
      .references("id")
      .inTable("persons")
      .onDelete("CASCADE");
    table
      .integer("book_id")
      .notNullable()
      .unsigned()
      .references("id")
      .inTable("books")
      .onDelete("CASCADE");
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable("borrowed_books");
}
