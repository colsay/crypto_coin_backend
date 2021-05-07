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

  // Route: "/profile/displayname"
  router.route("/").get(getAlias).post(insertUserDatabase);

  function getAlias(req, res) {
    let address = req.query.address;
    console.log(req.query, "this is req query");
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
        return userService.addAlias(alias, address).then(() => {
          console.log("success updating");
          res.send(alias);
        });
      } else {
        return userService.updateAlias(alias, address).then(() => {
          console.log("success updating");
          res.send(alias);
        });
      }
    });
  }
  return router;
};
