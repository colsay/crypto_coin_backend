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

	router.route("/profile").post(postNftData).put(putNftData).delete(burnNft);

	function getOneMetadata(req, res) {
		// console.log(req.params.tokenId);
		return metadataService
			.listOneMetadata(req.params.tokenId)
			.then((data) => {
				res.json(data);
			})
			.catch((err) => res.status(500).json(err));
	}

	function getAllMetadata(req, res) {
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
			.filterMetadata(req.body)
			.then((data) => {
				// console.log("filterdata");
				// console.log(data);
				res.json(data);
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

	function postNftData(req, res) {
		console.log("posting metadata", req.body);
		// let inputPrice = parseFloat(req.body.current_price).toFixed(4);
		let inputPrice = 0;
		return metadataService
			.addMetadata(
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
			.then(() => console.log("metadata input success"))
			.catch((err) => res.status(500).json(err));
	}

	return router;
};
