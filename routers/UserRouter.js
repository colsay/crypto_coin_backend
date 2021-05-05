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
  router.route("/profile/displayname").post(insertUserDatabase);

  function insertUserDatabase(req, res) {
    let address = req.body.address;
    let alias = req.body.alias;
    console.log(req.body.address);
    console.log("reached users database");
    return userService.checkUser(req.body.address).then((hvData) => {
      if (!hvData) {
        return userService.addAlias(alias, address);
      } else {
        return userService.updateAlias(alias, address);
      }
    });
  }
  return router;
};
