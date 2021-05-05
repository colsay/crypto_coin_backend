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

    if (sortoption === "CREATE_DATE") {
      query.orderBy("metadata.created_at", "desc");
    }

    // if (sortoption === "LIST_DATE") {
    //   query.orderBy("nft_variables.listed_time", "desc");
    // }

    if (sortoption === "PRICE_DESC") {
      query.orderBy("nft_variables.current_price", "desc");
    }

    if (sortoption === "PRICE_ASC") {
      query.orderBy("nft_variables.current_price", "asc");
    }

    if (sortoption === "ALPHABET_ASC") {
      query.orderBy("metadata.name", "asc");
    }

    if (sortoption === "ALPHABET_DESC") {
      query.orderBy("metadata.name", "desc");
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
