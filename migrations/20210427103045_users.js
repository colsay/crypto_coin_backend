exports.up = function (knex) {
	return knex.schema.createTable("users", (table) => {
		table.increments();
		table.varchar("alias");
		table.varchar("address").unique();
		table.timestamps(true, true);
	});
};

exports.down = function (knex) {
	return knex.schema.dropTable("users");
};
