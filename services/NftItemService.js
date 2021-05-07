module.exports = class NftItemService {
  constructor(knex) {
    this.knex = knex;
  }

  getNFTSortedNew() {
    let query = this.knex
      .select("*")
      .from("metadata")
      .innerJoin("nft_variables", "metadata.token_id", "nft_variables.token_id")
      .orderBy("metadata.token_id", "desc")
      .limit(20);

    return query
      .then((data) => {
        return data;
      })
      .catch((err) => console.log(err));
  }

  getNFTSortedFeatured() {
    let query = this.knex
      .select("*")
      .from("metadata")
      .innerJoin("nft_variables", "metadata.token_id", "nft_variables.token_id")
      .where("nft_variables.featured", true)
      .orderBy("metadata.token_id", "desc");

    return query
      .then((data) => {
        return data;
      })
      .catch((err) => console.log(err));
  }

  listAllNFTItems() {
    let query = this.knex
      .select("*")
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

  listOneNFTItem(tokenId) {
    let query = this.knex
      .select("*")
      .from("metadata")
      .innerJoin("nft_variables", "metadata.token_id", "nft_variables.token_id")
      .where("metadata.token_id", tokenId);
    return query
      .then((data) => {
        return data;
      })
      .catch((err) => console.log(err));
  }

  filterNFTItems(reqbody) {
    let { status, collection, sortoption } = reqbody;
    let query = this.knex
      .select("*")
      .from("metadata")
      .innerJoin(
        "nft_variables",
        "metadata.token_id",
        "nft_variables.token_id"
      );
    //1. Collection Filters
    if (collection.length > 0) {
      query.whereIn("collection", collection);
    }
    //2. Status Filters
    if (status.indexOf("Listed on Sale") > -1) {
      query.where("nft_variables.on_sale", true);
    }

    if (status.indexOf("New") > -1) {
      query.orderBy("metadata.token_id", "desc").limit(20);
    }
    //3. Sort Options
    switch (sortoption) {
      case "CREATE_DATE":
        query.where("nft_variables.on_sale", true);
        break;
      case "LIST_DATE":
        query.orderBy("nft_variables.listed_time", "desc");
        break;
      case "PRICE_DESC":
        query.orderBy("nft_variables.current_price", "desc");
        break;
      case "PRICE_ASC":
        query.orderBy("nft_variables.current_price", "asc");
        break;
      case "ALPHABET_ASC":
        query.orderBy("metadata.name", "asc");
        break;
      case "ALPHABET_DESC":
        query.orderBy("metadata.name", "desc");
        break;
    }

    // console.log(query._statements);
    // console.log("query");

    return query
      .then((data) => {
        return data;
      })
      .catch((err) => console.log(err));
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

  // listNftData(tokenId) {
  //   let query = this.knex
  //     .select(
  //       "nft_variables.creator",
  //       "nft_variables.owner",
  //       "nft_variables.current_price"
  //     )
  //     .from("nft_variables")
  //     .where("nft_variables.token_id", tokenId);
  //   return query.then((data) => {
  //     return data;
  //   });
  // }

  // addNftData(tokenId, creator, owner, on_sale, currentPrice) {
  //   return this.knex("nft_variables").insert({
  //     token_id: tokenId,
  //     creator: creator,
  //     owner: owner,
  //     on_sale: on_sale,
  //     current_price: currentPrice,
  //   });
  // }
};
