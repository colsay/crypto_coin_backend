module.exports = class MetadataService {
  constructor(knex) {
    this.knex = knex;
  }

  listData(tokenid) {
    let query = this.knex
      .select(
        "metadata.name",
        "metadata.image",
        "metadata.description",
        "metadata.external_url"
      )
      .from("metadata")
      .where("metadata.token_id", tokenid);
    return query.then((data) => {
      return data;
    });
  }

  addData(tokenid, name, image, description, external_url) {
    // return this.knex("test").insert({ name: "Attempt" });
    // console.log(tags);
    return this.knex("metadata").insert({
      token_id: tokenid,
      name: name,
      image: image,
      description: description,
      external_url: external_url,
    });
  }
};
