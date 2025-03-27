/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seeds(knex) {
  // Deletes ALL existing entries
  await knex("persons").del();
  await knex("persons").insert([
    
  ]);
}
