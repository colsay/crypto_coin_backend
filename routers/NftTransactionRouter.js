module.exports = (express) => {
  console.log("router running");
  const router = express.Router();

  // Knex Setup
  const knexConfig = require("../knexfile").development;
  const knex = require("knex")(knexConfig);

  const NftTransactionService = require("../services/NftTransactionService");
  const nftTransactionService = new NftTransactionService(knex);

  const NftItemService = require("../services/NftItemService");
  const nftItemService = new NftItemService(knex);

  router.route("/items").post(postTransaction);

  //Route for getting NFT Transaction(owner logged in)
  router.route("/profile").get(getOwnerTransaction);

  function getOwnerTransaction(req, res) {
    let address = req.query.address;
    console.log(req.query.address);
    console.log("reached NFT owner transaction backend");
    return nftTransactionService
      .getNftOwnerTransaction(address)
      .then((data) => {
        console.log("user NFT transaction", data);
        res.send(data);
      })
      .catch((err) => res.status(500).json(err));
  }

  function postTransaction(req, res) {
    console.log("posting NFT transaction history");
    console.log(req.body.token_id);
    return nftTransactionService
      .addNftTransaction(
        req.body.token_id,
        req.body.from_address,
        req.body.to_address,
        req.body.price
      )
      .then(() => {
        return nftItemService.updateNftData(
          req.body.token_id,
          req.body.owner,
          req.body.on_sale,
          req.body.current_price
        );
      })
      .then(() => console.log("Post transaction success"))
      .catch((err) => res.status(500).json(err));
  }

  return router;
};
