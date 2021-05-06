module.exports = class MetadataService {
  constructor(knex) {
    this.knex = knex;
  }

  //listNewMetadata
  //listFeaturedMetadata
  //listOneMetadata
  //listAllMetadata
  //filterMetadata
  //addMetadata

  listNewMetadata() {
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

  listFeaturedMetadata() {
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

  listAllItemData(tokenId) {
    console.log("list", tokenId);
    let query = this.knex("metadata")
      .select(
        "metadata.token_id",
        "metadata.name",
        "metadata.collection",
        "metadata.asset_id",
        "metadata.image",
        "metadata.description",
        "metadata.external_url",
        "nft_variables.current_price",
        "nft_variables.creator",
        "nft_variables.owner",
        "nft_transaction.from_address",
        "nft_transaction.to_address",
        "nft_transaction.price",
        "nft_transaction.created_at"
      )
      .innerJoin("nft_variables", "metadata.token_id", "nft_variables.token_id")
      .innerJoin(
        "nft_transaction",
        "metadata.token_id",
        "nft_transaction.token_id"
      )
      .where("metadata.token_id", tokenId);
    return query
      .then((data) => {
        console.log("Output data", data);
      })
      .catch((err) => console.log(err));
  }

  listTransactionData(tokenId) {
    console.log("list", tokenId);
    let query = this.knex("nft_transaction")
      .select(
        "nft_transaction.from_address",
        "nft_transaction.to_address",
        "nft_transaction.price",
        "nft_transaction.created_at"
      )
      .innerJoin("metadata", "metadata.token_id", "nft_transaction.token_id")
      .where("metadata.token_id", tokenId);
    return query
      .then((data) => {
        return data;
      })
      .catch((err) => console.log(err));
  }

  filterMetadata(reqbody) {
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
      // case "LIST_DATE":
      //   query.orderBy("nft_variables.listed_time", "desc");
      //   break;
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
