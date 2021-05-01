exports.up = function (knex) {
  return knex.schema.createTable("metadata", (table) => {
    table.increments();
    table.integer("token_id").unique();
    table.varchar("name");
    table.varchar("collection");
    table.string("asset_id");
    table.text("image");
    table.text("description");
    table.text("external_url");
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("metadata");
};
