"use strict";

module.exports = (express) => {
  const router = express.Router();
  // const axios = require("axios");

  // Knex Setup
  const knexConfig = require("../knexfile").development;
  const knex = require("knex")(knexConfig);
  const CchSql = require("../services/cchTransferService");
  const cchsql = new CchSql(knex);

  router.route("/transaction/:address").get(getTransaction);
  router.route("/transaction").post(newTransaction);

  function getTransaction(req, res) {
    let address = req.params.address;
    console.log("reached CCH backend", req.params.address);
    return cchsql
      .getAddressTransaction(address)
      .then((data) => {
        console.log("user transaction", data);
        res.send(data);
      })
      .catch((err) => res.status(500).json(err));
  }

  function newTransaction(req, res) {
    console.log("posting CCH backend");
    let fromAddress = req.body.fromAddress;
    let toAddress = req.body.toAddress;
    let amount = req.body.amount;
    let category = req.body.category;
    let currency = req.body.currency;
    return cchsql
      .addTransaction(fromAddress, toAddress, amount, category, currency)
      .then(() => {
        console.log("transaction added");
        res.send("transaction added");
      })
      .catch((err) => res.status(500).json(err));
  }

  return router;
};
