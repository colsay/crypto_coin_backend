const knexConfig = require("../knexfile").development;
const knex = require("knex")(knexConfig);

module.exports = class CchSql {
	constructor(transaction) {
		this.transaction = transaction;
	}

	getAddressTransaction(address) {
		console.log("hi", address);
		return knex(this.transaction)
			.where("from_address", address)
			.orWhere("to_address", address)
			.orderBy("id", "desc");
	}

	addTransaction(from_address, to_address, amount, category, currency) {
		return knex(this.transaction).insert({
			from_address,
			to_address,
			amount,
			category,
			currency,
		});
	}
};
