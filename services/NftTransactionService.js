module.exports = class NftTransferService {
  constructor(knex) {
    this.knex = knex;
  }

  getNftTokenTransaction(tokenId) {
    console.log("hi", tokenId);
    let query = this.knex
      .select(
        "nft_transaction.from_address",
        "nft_transaction.to_address",
        "nft_transaction.price",
        "nft_transaction.created_at"
      )
      .from("nft_transaction")
      .where("nft_transaction.token_id", tokenId)
      .orderBy("created_at", "desc");
    return query.then((data) => {
      return data;
    });
  }

  getNftOwnerTransaction(address) {
    console.log("hi", tokenId);
    let query = this.knex
      .select(
        "nft_transaction.from_address",
        "nft_transaction.to_address",
        "nft_transaction.price",
        "nft_transaction.created_at"
      )
      .from("nft_transaction")
      .where("nft_transaction.from_address", address)
      .orWhere("nft_transaction.to_address", address)
      .orderBy("created_at", "desc");
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
