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

  addNftData(tokenId, creator, owner, currentPrice) {
    return this.knex("nft_variables").insert({
      token_id: tokenId,
      creator: creator,
      owner: owner,
      current_price: currentPrice,
    });
  }
};
