module.exports = class NftItemService {
  constructor(knex) {
    this.knex = knex;
  }

  listNftData(tokenId) {
    let query = this.knex
      .select(
        "nft_variables.creator",
        "nft_variables.owner",
        "nft_variables.current_price"
      )
      .from("nft_variables")
      .where("nft_variables.token_id", tokenId);
    return query.then((data) => {
      return data;
    });
  }

  addNftData(tokenId, creator, owner, on_sale, currentPrice) {
    return this.knex("nft_variables").insert({
      token_id: tokenId,
      creator: creator,
      owner: owner,
      on_sale: on_sale,
      current_price: currentPrice,
    });
  }

  updateNftData(tokenId, owner, on_sale, currentPrice) {
    return this.knex("nft_variables").where("token_id", tokenId).update({
      owner: owner,
      on_sale: on_sale,
      current_price: currentPrice,
    });
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
};
