exports.up = function (knex) {
  return knex.schema.createTable("nft_variables", (table) => {
    table.increments();
    table.integer("token_id").unique();
    table.text("creator");
    table.text("owner");
    table.decimal("current_price", 14, 4);
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("nft_variables");
};
