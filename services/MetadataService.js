module.exports = class MetadataService {
	constructor(knex) {
		this.knex = knex;
	}

	//listOneMetadata
	//listAllMetadata
	//filterMetadata
	//addMetadata

	listOneMetadata(tokenId) {
		let query = this.knex
			.select(
				"metadata.name",
				"metadata.collection",
				"metadata.asset_id",
				"metadata.image",
				"metadata.description",
				"metadata.external_url",
				"metadata.token_id",
				"nft_variables.current_price",
				"nft_variables.creator",
				"nft_variables.owner"
			)
			.from("metadata")
			.innerJoin("nft_variables", "metadata.token_id", "nft_variables.token_id")
			.where("metadata.token_id", tokenId);
		return query
			.then((data) => {
				return data;
			})
			.catch((err) => console.log(err));
	}

	listAllMetadata() {
		let query = this.knex
			.select(
				"metadata.name",
				"metadata.collection",
				"metadata.asset_id",
				"metadata.image",
				"metadata.description",
				"metadata.external_url",
				"metadata.token_id",
				"nft_variables.current_price"
			)
			.from("metadata")
			.innerJoin(
				"nft_variables",
				"metadata.token_id",
				"nft_variables.token_id"
			);
		return query
			.then((data) => {
				return data;
			})
			.catch((err) => console.log(err));
	}

	filterMetadata(statusArr, collecArr) {
		// console.log("statusArr");
		// console.log(statusArr);
		let query = this.knex
			.select("*")
			.from("metadata")
			.innerJoin(
				"nft_variables",
				"metadata.token_id",
				"nft_variables.token_id"
			);

		if (collecArr.length > 0) {
			query.whereIn("collection", collecArr);
		} else {
			query;
		}

		if (statusArr.indexOf("New") > -1) {
			query.orderBy("metadata.token_id", "desc");
		} else {
			query;
		}

		if (statusArr.indexOf("Listed on Sale") > -1) {
			console.log("listed on sale");

			query.where("nft_variables.on_sale", true);
		} else {
			query;
		}

		// console.log(query._statements);
		// console.log("query");

		// query.where("collection", "shoes");

		// switch (expr) {
		//   case "Oranges":
		//     console.log("Oranges are $0.59 a pound.");
		//     break;
		//   case "Papayas":
		//     console.log("Mangoes and papayas are $2.79 a pound.");
		//     break;
		//   default:
		//     console.error("metaservice switch error");
		// }

		return query
			.then((data) => {
				return data;
			})
			.catch((err) => console.log(err));
	}

	addMetadata(
		token_id,
		name,
		collection,
		asset_id,
		image,
		description,
		external_url,
		creator,
		owner,
		on_sale,
		current_price
	) {
		// return this.knex("test").insert({ name: "Attempt" });
		// console.log(tags);
		return this.knex("metadata")
			.insert({
				token_id,
				name,
				collection,
				asset_id,
				image,
				description,
				external_url,
			})
			.then(() => {
				return this.knex("nft_variables").insert({
					token_id,
					creator,
					owner,
					on_sale,
					current_price,
				});
			});
	}
};
