module.exports = (express) => {
  // console.log("router running");
  const router = express.Router();

  // Knex Setup
  const knexConfig = require("../knexfile").development;
  const knex = require("knex")(knexConfig);

  const NftItemService = require("../services/NftItemService");
  const nftItemService = new NftItemService(knex);
  const NftTransactionService = require("../services/NftTransactionService");
  const nftTransactionService = new NftTransactionService(knex);

  //Route: "/items"
  // router.route("/").get(getAllNFT).post(getFilteredNFT);
  router.route("/").post(getFilteredNFT);
  router.route("/homepage").get(getHomePageNFT);
  router.route("/asset/:tokenId").get(getOneNFT);

  function getHomePageNFT(req, res) {
    let output = [];
    return nftItemService
      .getNFTSortedNew()
      .then((data) => {
        output[0] = data;
        return "";
      })
      .then(() => {
        return nftItemService.getNFTSortedFeatured();
      })
      .then((data) => {
        output[1] = data;
        // console.log("homepageoutput");
        // console.log(output);
        res.json(output);
      })
      .catch((err) => res.status(500).json(err));
  }

  // function getAllNFT(req, res) {
  //   return nftItemService
  //     .listAllNFTItems()
  //     .then((data) => {
  //       res.json(data);
  //     })
  //     .catch((err) => res.status(500).json(err));
  // }

  //POST req for GETTING filtered data
  function getFilteredNFT(req, res) {
    console.log("filter metadata");
    console.log(req.body);
    return nftItemService
      .filterNFTItems(req.body)
      .then((data) => {
        // console.log("filterdata");
        // console.log(data);
        res.json(data);
      })
      .catch((err) => res.status(500).json(err));
  }

  function getOneNFT(req, res) {
    // console.log(req.params.tokenId);
    let nftData;
    let output = [];
    return nftItemService
      .listOneNFTItem(req.params.tokenId)
      .then((data) => {
        output[0] = data[0];
      })
      .then(() => {
        return nftTransactionService.checkTokenTransaction(req.params.tokenId);
      })
      .then((hvData) => {
        // console.log(hvData);
        if (hvData) {
          return nftTransactionService
            .getNftTokenTransaction(req.params.tokenId)
            .then((data) => {
              // console.log(data);
              output[1] = data;
              // console.log(output);
              res.json(output);
            });
        } else {
          output.nftdata = nftData;
          // console.log(output);
          res.json(output);
        }
      });
  }

  return router;
};
