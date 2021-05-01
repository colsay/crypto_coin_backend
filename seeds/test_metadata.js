exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex("metadata")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("metadata").insert([
        {
          token_id: 1,
          name: "Halloween hat",
          collection: "festivals",
          asset_id: "string asset_id",
          image: "https://xxxx.png",
          external_url:
            "https://www.iconfinder.com/icons/204344/hat_halloween_witch_icon",
          description: "Super rare halloween hat for trick and treet!",
        },
      ]);
    });
};
