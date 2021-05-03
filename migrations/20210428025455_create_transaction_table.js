exports.up = function (knex) {
  return knex.schema.createTable("cch_transaction", (table) => {
    table.increments();
    table.string("from_address");
    table.string("to_address");
    table.decimal("amount");
    table.string("currency");
    table.string("category");
    table.timestamps(false, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("cch_transaction");
};
