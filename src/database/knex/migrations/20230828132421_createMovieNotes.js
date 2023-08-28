/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable("movie_notes", table =>{
    table.increments("id")
    table.text("title")
    table.text("description")
    table.text("rating")
   
    table.integer('user_id').references('id').inTable('users')

    table.timestamp("created_at").default(knex.fn.now())
    table.timestamp("updated_at").default(knex.fn.now())
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  
  return knex.schema.dropTable("movie_notes")
}
