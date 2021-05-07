module.exports = class MetadataService {
  constructor(knex) {
    this.knex = knex;
  }

  //addMetadata

  // listSellerNftData(address) {
  //   let query = this.knex
  //     .select(
  //       "metadata.name",
  //       "metadata.collection",
  //       "metadata.asset_id",
  //       "metadata.image",
  //       "metadata.description",
  //       "metadata.external_url",
  //       "metadata.token_id",
  //       "nft_variables.current_price",
  //       "nft_variables.creator",
  //       "nft_variables.owner",
  //       "users.alias"
  //     )
  //     .from("metadata")
  //     .innerJoin("nft_variables", "metadata.token_id", "nft_variables.token_id")
  //     .innerJoin("users", "users.address", "nft_variables.owner")
  //     .where("nft_variables.owner", address);
  //   return query
  //     .then((data) => {
  //       return data;
  //     })
  //     .catch((err) => console.log(err));
  // }

  // listAllItemData(tokenId) {
  //   console.log("list", tokenId);
  //   let query = this.knex("metadata")
  //     .select("*")
  //     .innerJoin("nft_variables", "metadata.token_id", "nft_variables.token_id")
  //     .innerJoin(
  //       "nft_transaction",
  //       "metadata.token_id",
  //       "nft_transaction.token_id"
  //     )
  //     .where("metadata.token_id", tokenId);
  //   return query
  //     .then((data) => {
  //       console.log("Output data", data);
  //     })
  //     .catch((err) => console.log(err));
  // }

  // listTransactionData(tokenId) {
  //   console.log("list", tokenId);
  //   let query = this.knex("nft_transaction")
  //     .select(
  //       "nft_transaction.from_address",
  //       "nft_transaction.to_address",
  //       "nft_transaction.price",
  //       "nft_transaction.created_at"
  //     )
  //     .innerJoin("metadata", "metadata.token_id", "nft_transaction.token_id")
  //     .where("metadata.token_id", tokenId);
  //   return query
  //     .then((data) => {
  //       return data;
  //     })
  //     .catch((err) => console.log(err));
  // }

  addMetadata(
    tokenId,
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
        token_id: tokenId,
        name: name,
        collection: collection,
        asset_id: asset_id,
        image: image,
        description: description,
        external_url: external_url,
      })
      .then(() => {
        return this.knex("nft_variables").insert({
          token_id: tokenId,
          creator: creator,
          owner: owner,
          on_sale: on_sale,
          current_price: current_price,
        });
      });
  }
};
