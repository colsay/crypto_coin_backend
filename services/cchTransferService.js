const knexConfig = require("../knexfile").development;
const knex = require("knex")(knexConfig);

module.exports = class CchSql {
  constructor(knex) {
    this.knex = knex;
  }

  getAddressTransaction(address) {
    console.log("hi", address);
    let query = this.knex
      .select("*")
      .from("cch_transaction")
      .where("from_address", address)
      .orWhere("to_address", address)
      .orderBy("id", "desc");
    return query.then((data) => {
      return data;
    });
  }

  addTransaction(from_address, to_address, amount, category, currency) {
    return this.knex("cch_transaction").insert({
      from_address,
      to_address,
      amount,
      category,
      currency,
    });
  }
};
