module.exports = (express) => {
  console.log("router running");
  const router = express.Router();

  // Knex Setup
  const knexConfig = require("../knexfile").development;
  const knex = require("knex")(knexConfig);

  const MetadataService = require("../services/MetadataService");
  const metadataService = new MetadataService(knex);

  router.route("/metadata/").get(getAllMetadata).post(filterMetadata);
  router.route("/metadata/:tokenId").get(getOneMetadata).post(postMetadata);

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

  function postMetadata(req, res) {
    console.log("posting metadata");
    return metadataService
      .addMetadata(
        req.params.tokenId,
        req.body.name,
        req.body.collection,
        req.body.asset_id,
        req.body.image,
        req.body.description,
        req.body.external_url
      )
      .then(() => res.redirect("/"))
      .catch((err) => res.status(500).json(err));
  }
  return router;
};
