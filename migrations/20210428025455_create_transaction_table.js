exports.up = function (knex) {
	return knex.schema.createTable("transaction", (table) => {
		table.increments();
		table.string("from_address");
		table.string("to_address");
		table.string("amount");
		table.string("currency");
		table.string("category");
		table.timestamps(false, true);
	});
};

exports.down = function (knex) {
	return knex.schema.dropTable("transaction");
};
