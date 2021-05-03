exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex("cch_transaction")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("cch_transaction").insert([
        {
          from_address: "0x1dB1c31E7615c76483483Ea56C00edABE2Cb1c7F",
          to_address: "0x8731E18Bb3F551ef627Fe93Be975e2f82C9E1FC5",
          amount: "3.8239",
          currency: "ETH",
          category: "transfer",
        },
      ]);
    });
};
