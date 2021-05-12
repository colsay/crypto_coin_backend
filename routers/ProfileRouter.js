module.exports = (express) => {
  console.log("router running");
  const router = express.Router();

  // Knex Setup
  const knexConfig = require("../knexfile").development;
  const knex = require("knex")(knexConfig);

  const ProfileService = require("../services/ProfileService");
  const profileService = new ProfileService(knex);

  const UserService = require("../services/UserService");
  const userService = new UserService(knex);

  //Route: /profile
  router.route("/").post(postNftData).put(putNftData).delete(burnNft);
  router.route("/:walletAddress").get(getOwnNftData);

  function putNftData(req, res) {
    console.log(req.body);
    return profileService
      .updateNftData(
        req.body.token_id,
        req.body.owner,
        req.body.on_sale,
        req.body.current_price
      )
      .then(() => {
        console.log("put success");
        res.send("put success");
      })
      .catch((err) => res.status(500).json(err));
  }

  function burnNft(req, res) {
    console.log("delete NFT", req.body);
    return profileService
      .removeNftData(req.body.token_id)
      .then(() => {
        console.log("delete token success");
        res.send("delete token success");
      })
      .catch((err) => res.status(500).json(err));
  }

  function postNftData(req, res) {
    console.log("posting metadata", req.body);
    // let inputPrice = parseFloat(req.body.current_price).toFixed(4);
    let inputPrice = 0;
    return profileService
      .postNFTdata(
        req.body.token_id,
        req.body.name,
        req.body.collection,
        req.body.asset_id,
        req.body.image,
        req.body.description,
        req.body.externalUrl,
        req.body.creator,
        req.body.owner,
        req.body.on_sale,
        inputPrice
      )
      .then(() => {
        console.log("metadata input success");
        res.send("metadata input success to frontend");
      })
      .catch((err) => res.status(500).json(err));
  }

  function getOwnNftData(req, res) {
    console.log("getsellerNFT");
    let output = {};
    return profileService
      .listOwnNft(req.params.walletAddress)
      .then((data) => {
        console.log("listown");
        console.log(data);
        output.items = data;
        return "";
      })
      .then(() => {
        return userService.getUsername(req.params.walletAddress);
      })
      .then((data) => {
        output.alias = data;
        res.json(output);
      })
      .catch((err) => res.status(500).json(err));
  }

  return router;
};
