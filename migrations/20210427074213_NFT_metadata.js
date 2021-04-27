exports.up = function (knex) {
  return knex.schema.createTable("metadata", (table) => {
    table.increments("id");
    table.integer("token_id").unique();
    table.varchar("name");
    table.text("image");
    table.text("description");
    table.text("external_url");
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("metadata");
};
