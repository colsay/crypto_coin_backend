module.exports = class ProfileService {
  constructor(knex) {
    this.knex = knex;
  }

  updateNftData(tokenId, owner, on_sale, currentPrice) {
    let query = this.knex("nft_variables").where("token_id", tokenId);

    if (on_sale !== false) {
      query.update({
        owner: owner,
        on_sale: on_sale,
        current_price: currentPrice,
        listed_time: this.knex.fn.now(),
      });
    } else {
      query.update({
        owner: owner,
        on_sale: on_sale,
        current_price: currentPrice,
        listed_time: null,
      });
    }
    return query
      .then((data) => console.log("updateNftDone"))
      .catch((err) => console.log(err));
  }

  removeNftData(tokenId) {
    return this.knex("nft_transaction")
      .where("token_id", tokenId)
      .del()
      .then(() => {
        return this.knex("nft_variables").where("token_id", tokenId).del();
      })
      .then(() => {
        return this.knex("metadata").where("token_id", tokenId).del();
      })
      .catch((err) => console.error(err));
  }

  postNFTdata(
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
