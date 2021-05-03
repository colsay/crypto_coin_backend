exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex("nft_variables")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("nft_variables").insert([
        {
          token_id: 1,
          creator: "0x1dB1c31E7615c76483483Ea56C00edABE2Cb1c7F",
          owner: "0x8731E18Bb3F551ef627Fe93Be975e2f82C9E1FC5",
          current_price: "0.67576327",
        },
      ]);
    });
};
