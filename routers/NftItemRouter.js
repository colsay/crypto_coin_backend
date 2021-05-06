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

  router.route("/profiles/:walletAddress").get(getSellerNft);
  // .post(filterMetadata);

  function getNftItemData(req, res) {
    console.log("reached NFT item backend");
    console.log(req.params.tokenId);
    let nftData;
    let output = [];
    return metadataService
      .listOneMetadata(req.params.tokenId)
      .then((data) => {
        output[0] = data[0];
      })
      .then(() => {
        return nftTransactionService.checkTokenTransaction(req.params.tokenId);
      })
      .then((hvData) => {
        console.log(hvData);
        if (hvData) {
          return metadataService
            .listTransactionData(req.params.tokenId)
            .then((data) => {
              output[1] = data;
              console.log(output);
              res.json(output);
            });
        } else {
          output.nftdata = nftData;
          console.log(output);
          res.json(output);
        }
      });
  }

  function getSellerNft(req, res) {
    return metadataService
      .listSellerNftData(req.params.walletAddress)
      .then((data) => {
        res.json(data);
      })
      .catch((err) => res.status(500).json(err));
  }

  // function filterMetadata(req, res) {
  //   console.log("filter metadata");
  //   console.log(req.body);
  //   return metadataService
  //     .filterMetadata(req.body)
  //     .then((data) => {
  //       // console.log("filterdata");
  //       // console.log(data);
  //       res.json(data);
  //     })
  //     .catch((err) => res.status(500).json(err));
  // }

  return router;
};
