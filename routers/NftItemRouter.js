module.exports = (express) => {
  console.log("router running");
  const router = express.Router();

  // Knex Setup
  const knexConfig = require("../knexfile").development;
  const knex = require("knex")(knexConfig);

  const NftItemService = require("../services/NftItemService");
  const nftItemService = new NftItemService(knex);
  const NftTransactionService = require("../services/NftTransactionService");
  const nftTransactionService = new NftTransactionService(knex);

  router
    .route("/item/1")
    // .get(getNftInfo)
    .post(postTransaction);

  router.route("/profile/:address").get(getOwnerTransaction);

  function getNftInfo(req, res) {
    function getItemVariables() {
      console.log("reached item variables backend");
      console.log(req.params.tokenId);
      return nftItemService
        .listNftData(req.params.tokenId)
        .then((data) => {
          return data;
        })
        .catch((err) => res.status(500).json(err));
    }

    function getTransaction() {
      console.log("reached NFT transaction history backend");
      console.log(req.params.tokenId);
      return nftTransactionService
        .getNftTokenTransaction(req.params.tokenId)
        .then((data) => {
          return data;
        })
        .catch((err) => res.status(500).json(err));
    }

    Promise.all([getItemVariables(), getTransaction()])
      .then(function (results) {
        console.log("promise successful");
        const nftItem = results[0];
        const nftTransaction = results[1];
        console.log(nftItem);
        console.log(nftTransaction);
        res.send({ item: nftItem, transaction: nftTransaction });
      })
      .catch((err) => res.status(500).json(err));
  }

  function getOwnerTransaction(req, res) {
    let address = req.params.address;
    console.log("reached NFT owner transaction backend", req.params.address);
    return nftTransactionService
      .getNftOwnerTransaction(address)
      .then((data) => {
        console.log("user NFT transaction", data);
        res.send(data);
      })
      .catch((err) => res.status(500).json(err));
  }

  function postItemVariables() {
    console.log("posting item variables");
    let inputPrice = parseFloat(req.body.current_price).toFixed(4);
    console.log(inputPrice);
    return nftItemService
      .addNftData(
        req.body.token_id,
        req.body.creator,
        req.body.owner,
        req.body.on_sale,
        inputPrice
      )
      .then(() => console.log("Post item success"))
      .catch((err) => res.status(500).json(err));
  }

  function postTransaction(req, res) {
    console.log("posting NFT transaction history");
    console.log(req.params.tokenId);
    return nftTransactionService
      .addNftTransaction(
        req.params.tokenId,
        req.body.from_address,
        req.body.to_address,
        req.body.price
      )
      .then(() => console.log("Post transaction success"))
      .catch((err) => res.status(500).json(err));
  }

  return router;
};
