module.exports = (express) => {
  console.log("router running");
  const router = express.Router();

  // Knex Setup
  const knexConfig = require("../knexfile").development;
  const knex = require("knex")(knexConfig);

  const MetadataService = require("../services/MetadataService");
  const metadataService = new MetadataService(knex);
  const NftItemService = require("../services/NftItemService");
  const nftItemService = new NftItemService(knex);
  const NftTransactionService = require("../services/NftTransactionService");
  const nftTransactionService = new NftTransactionService(knex);

  router.route("/items/:tokenId").get(getNftItemData);

  function getNftItemData(req, res) {
    console.log("reached NFT item backend");
    console.log(req.params.tokenId);
    return nftTransactionService
      .checkTokenTransaction(req.params.tokenId)
      .then((hvData) => {
        if (!hvData) {
          return metadataService.listItemDataWithoutTransaction(
            req.params.tokenId
          );
          //   .then((data) => {
          //     console.log(data)
          // }
        } else {
          return metadataService.listAllItemData(req.params.tokenId);
        }
      });
  }
  return router;
};
