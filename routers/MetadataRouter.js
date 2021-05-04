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

	router
		.route("/profile")
		.get(getMetadata)
		.post(postNftData)
		.put(putNftData)
		.delete(burnNft);

	function getMetadata(req, res) {
		console.log("reached metadata backend");
		console.log(req.params.tokenId);
		return metadataService
			.listMetadata(req.params.tokenId)
			.then((data) => {
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

	function putNftData(req, res) {
		console.log(req.body);
		return nftItemService
			.updateNftData(
				req.body.token_id,
				req.body.owner,
				req.body.on_sale,
				req.body.current_price
			)
			.then(() => console.log("put success"))
			.catch((err) => res.status(500).json(err));
	}
	function burnNft(req, res) {
		console.log("delete NFT", req.body);
		return nftItemService
			.removeNftData(req.body.token_id)
			.then(() => console.log("delete token success"))
			.catch((err) => res.status(500).json(err));
	}

	return router;
};
