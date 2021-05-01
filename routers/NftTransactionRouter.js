// module.exports = (express) => {
//   console.log("router running");
//   const router = express.Router();

//   // Knex Setup
//   const knexConfig = require("../knexfile").development;
//   const knex = require("knex")(knexConfig);

//   const NftTransactionService = require("../services/NftTransactionService");
//   const nftTransactionService = new NftTransactionService(knex);

//   router.route("/:tokenId").get(getTransaction);
//   //   .post(postItemVariables);

//   function getTransaction(req, res) {
//     console.log("reached NFT transaction history backend");
//     console.log(req.params.tokenId);
//     return nftTransactionService
//       .getNftTransaction(req.params.tokenId)
//       .then((data) => {
//         res.json(data);
//       })
//       .catch((err) => res.status(500).json(err));
//   }

//   function postItemVariables(req, res) {
//     console.log("posting NFT transaction history");
//     let inputPrice = parseFloat(req.body.current_price).toFixed(4);
//     console.log(inputPrice);
//     return nftItemService
//       .addNftData(
//         req.params.tokenId,
//         req.body.creator,
//         req.body.owner,
//         inputPrice
//       )
//       .then(() => res.redirect("/"))
//       .catch((err) => res.status(500).json(err));
//   }
//   return router;
// };
