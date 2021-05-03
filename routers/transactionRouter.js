"use strict";
module.exports = (express) => {
  const router = express.Router();
  // const axios = require("axios");

  // Knex Setup
  const CchSql = require("../services/cchTransferService");
  const cchsql = new CchSql("transaction");

  const getTransaction = (req, res) => {
    let address = req.params.address;
    return cchsql.getAddressTransaction(address).then((data) => {
      console.log("user transaction", data);
      res.send(data);
    });
  };
  const newTransaction = (req, res) => {
    console.log("lets gogogo");
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
      });
  };
  router.route("/:address").get(getTransaction);
  router.route("/").post(newTransaction);
  return router;
};
