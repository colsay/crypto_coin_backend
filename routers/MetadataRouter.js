module.exports = (express) => {
  console.log("router running");
  const router = express.Router();

  // Knex Setup
  const knexConfig = require("../knexfile").development;
  const knex = require("knex")(knexConfig);

  const MetadataService = require("../services/MetadataService");
  const metadataService = new MetadataService(knex);

  router.route("/:tokenId/metadata.json").get(getMetadata).post(postMetadata);

  function getMetadata(req, res) {
    console.log("reached metadata backend");
    console.log(req.params.tokenId);
    return metadataService
      .listData(req.params.tokenId)
      .then((data) => {
        res.json(data);
      })
      .catch((err) => res.status(500).json(err));
  }

  function postMetadata(req, res) {
    console.log("posting metadata");
    return metadataService
      .addData(
        req.params.tokenId,
        req.body.name,
        req.body.image,
        req.body.description,
        req.body.external_url
      )
      .then(() => res.redirect("/"))
      .catch((err) => res.status(500).json(err));
  }
  return router;
};
