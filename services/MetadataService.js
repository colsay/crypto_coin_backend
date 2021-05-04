module.exports = class MetadataService {
  constructor(knex) {
    this.knex = knex;
  }

  listMetadata(tokenId) {
    let query = this.knex
      .select(
        "metadata.name",
        "metadata.collection",
        "metadata.asset_id",
        "metadata.image",
        "metadata.description",
        "metadata.external_url"
      )
      .from("metadata")
      .where("metadata.token_id", tokenId);
    return query.then((data) => {
      return data;
    });
  }

  addMetadata(
    tokenId,
    name,
    collection,
    asset_id,
    image,
    description,
    external_url
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
          current_price: currentPrice,
        });
      });
  }
};
