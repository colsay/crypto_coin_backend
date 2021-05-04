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

  router.route("/metadata/").get(getAllMetadata).post(filterMetadata);
  router.route("/metadata/:tokenId").get(getOneMetadata);
  router.route("/profile").post(postNftData);

  function getOneMetadata(req, res) {
    console.log("reached metadata backend");
    console.log(req.params.tokenId);
    return metadataService
      .listOneMetadata(req.params.tokenId)
      .then((data) => {
        res.json(data);
      })
      .catch((err) => res.status(500).json(err));
  }

  function getAllMetadata(req, res) {
    console.log("reached metadata backend");
    return metadataService
      .listAllMetadata(req.params.tokenId)
      .then((data) => {
        res.json(data);
      })
      .catch((err) => res.status(500).json(err));
  }

  //POST req for GETTING filtered data
  function filterMetadata(req, res) {
    console.log("filter metadata");
    console.log(req.body);
    return metadataService
      .filterMetadata(req.body.status, req.body.collection)
      .then((data) => {
        // console.log("filterdata");
        // console.log(data);
        res.json(data);
      })
      .catch((err) => res.status(500).json(err));
  }

  function postNftData(req, res) {
    function postMetadata() {
      console.log("posting metadata", req.body);
      return metadataService
        .addMetadata(
          req.body.token_id,
          req.body.name,
          req.body.collection,
          req.body.asset_id,
          req.body.image,
          req.body.description,
          req.body.external_url
        )
        .then(() => console.log("metadata input success"))
        .catch((err) => res.status(500).json(err));
    }

    function postItemVariables() {
      console.log("posting item variables");
      let inputPrice = parseFloat(req.body.current_price).toFixed(4);
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
    Promise.all([postMetadata(), postItemVariables()])
      .then(() => {
        console.log("Post promise successful");
      })
      .catch((err) => res.status(500).json(err));
  }

  return router;
};
