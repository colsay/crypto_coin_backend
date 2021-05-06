module.exports = (express) => {
  console.log("router running");
  const router = express.Router();

  // Knex Setup
  const knexConfig = require("../knexfile").development;
  const knex = require("knex")(knexConfig);

  const NftTransactionService = require("../services/NftTransactionService");
  const nftTransactionService = new NftTransactionService(knex);
  const UserService = require("../services/UserService");
  const userService = new UserService(knex);

  //Route for getting NFT Transaction(owner logged in)
  router.route("/profile/displayname").get(getAlias).post(insertUserDatabase);

  function getAlias(req, res) {
    let address = req.body.address;
    console.log("reached users database for getting Alias");
    return userService
      .getUsername(address)
      .then((data) => {
        console.log("user username", data);
        res.send(data);
      })
      .catch((err) => res.status(500).json(err));
  }

  function insertUserDatabase(req, res) {
    let address = req.body.address;
    let alias = req.body.alias;
    console.log(req.body.address);
    console.log("reached users database");
    return userService.checkUser(req.body.address).then((hvData) => {
      if (!hvData) {
        return userService.addAlias(alias, address).then((data) => {
          console.log("user username", data);
          res.send(data);
        });
      } else {
        return userService.updateAlias(alias, address);
      }
    });
  }
  return router;
};
