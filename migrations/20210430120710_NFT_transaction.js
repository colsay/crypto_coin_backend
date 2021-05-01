exports.up = function (knex) {
  return knex.schema.createTable("nft_transaction", (table) => {
    table.increments();
    table.integer("token_id").unique();
    table.string("from_address");
    table.string("to_address");
    table.decimal("price", 14, 4);
    table.timestamps(false, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("nft_transaction");
};
