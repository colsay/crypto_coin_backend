exports.up = function (knex) {
  return knex.schema.createTable("nft_transaction", (table) => {
    table.increments("id");
    table.integer("token_id").unsigned();
    table.foreign("token_id").references("metadata.token_id");
    table.integer("user_id").unsigned();
    table.foreign("user_id").references("users.id");
    table.string("from_address");
    table.string("to_address");
    table.decimal("price", 14, 4);
    table.timestamps(false, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("nft_transaction");
};
