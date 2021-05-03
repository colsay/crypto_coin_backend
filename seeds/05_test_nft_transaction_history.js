exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex("nft_transaction")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("nft_transaction").insert([
        {
          token_id: 1,
          user_id: 2,
          from_address: "0xE663c1f7bBd2a35C442f469eb358437F1Fbe523D",
          to_address: "0x229866584D5B6FCfd2D4e97E962Db7db86B6317F5",
          price: 7.7717,
        },
        {
          token_id: 2,
          user_id: 4,
          from_address: "0x229866584D5B6FCfd2D4e97E962Db7db86B6317FD",
          to_address: "0xA3F3349296174d7278DBaE42E415049cECa53339",
          price: 0.9216,
        },
        {
          token_id: 3,
          user_id: 6,
          from_address: "0xA3F3349296174d7278DBaE42E415049cECa53339",
          to_address: "0x7a492874f4DeC1Dd704ef784AA58A6467F2c9074",
          price: 0.5651,
        },
        {
          token_id: 4,
          user_id: 8,
          from_address: "0x7a492874f4DeC1Dd704ef784AA58A6467F2c9074",
          to_address: "0xB0246D3635da8c9631910e782453873C7537d802",
          price: 4.19,
        },
        {
          token_id: 5,
          user_id: 10,
          from_address: "0xB0246D3635da8c9631910e782453873C7537d802",
          to_address: "0x8731E18Bb3F551ef627Fe93Be975e2f82C9E1FC5",
          price: 5.558,
        },
        {
          token_id: 6,
          user_id: 9,
          from_address: "0x1dB1c31E7615c76483483Ea56C00edABE2Cb1c7F",
          to_address: "0x072a6FE107dDf14d6f2D8e1b270A0dF9d819FA4F",
          price: 8.2981,
        },
        {
          token_id: 7,
          user_id: 7,
          from_address: "0x072a6FE107dDf14d6f2D8e1b270A0dF9d819FA4F",
          to_address: "0x721bA77B87CF3E15fF9d68E27dd1B4aBc860DCB",
          price: 0.717145,
        },
        {
          token_id: 8,
          user_id: 5,
          from_address: "0x721bA77B87CF3E15fF9d68E27dd1B4aBc860DCB",
          to_address: "0x8731E18Bb3F551ef627Fe93Be975e2f82C9E1FC5",
          price: 6.4217,
        },
        {
          token_id: 9,
          user_id: 1,
          from_address: "0x15d1Cd04feAB63d2350408e530aE456441947eb1",
          to_address: "0xB0E514c372317276a76e0214c526f3417E309d54",
          price: 18.21,
        },
        {
          token_id: 10,
          user_id: 3,
          from_address: "0x1dB1c31E7615c76483483Ea56C00edABE2Cb1c7F",
          to_address: "0x15d1Cd04feAB63d2350408e530aE456441947eb1",
          price: 4.6712,
        },
      ]);
    });
};
