module.exports = class NftTransferService {
  constructor(knex) {
    this.knex = knex;
  }

  getNftTransaction(tokenId) {
    console.log("hi", tokenId);
    let query = this.knex
      .select(
        "nft_transaction.from_address",
        "nft_transaction.to_address",
        "nft_transaction.price",
        "nft_transaction.created_at"
      )
      .from("nft_transaction")
      .where("nft_transaction.token_id", tokenId);
    return query.then((data) => {
      return data;
    });
  }

  addNftTransaction(tokenId, from_address, to_address, price) {
    return this.knex("nft_transaction").insert({
      token_id: tokenId,
      from_address: from_address,
      to_address: to_address,
      price: price,
    });
  }
};
