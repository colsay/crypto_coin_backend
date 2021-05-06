module.exports = (express) => {
	console.log("router running");
	const router = express.Router();

	// Knex Setup
	const knexConfig = require("../knexfile").development;
	const knex = require("knex")(knexConfig);

	const NftItemService = require("../services/NftItemService");
	const nftItemService = new NftItemService(knex);
	const NftTransactionService = require("../services/NftTransactionService");
	const nftTransactionService = new NftTransactionService(knex);

	router.route("/items").get(getNftInfo);

	function getNftInfo(req, res) {
		function getItemVariables() {
			console.log("reached item variables backend");
			console.log(req.params.tokenId);
			return nftItemService
				.listNftData(req.params.tokenId)
				.then((data) => {
					return data;
				})
				.catch((err) => res.status(500).json(err));
		}

		function getTransaction() {
			console.log("reached NFT transaction history backend");
			console.log(req.params.tokenId);
			return nftTransactionService
				.getNftTokenTransaction(req.params.tokenId)
				.then((data) => {
					return data;
				})
				.catch((err) => res.status(500).json(err));
		}

		Promise.all([getItemVariables(), getTransaction()])
			.then(function (results) {
				console.log("promise successful");
				const nftItem = results[0];
				const nftTransaction = results[1];
				console.log(nftItem);
				console.log(nftTransaction);
				res.send({ item: nftItem, transaction: nftTransaction });
			})
			.catch((err) => res.status(500).json(err));
	}

	return router;
};
