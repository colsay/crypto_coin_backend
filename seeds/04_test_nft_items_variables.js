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
          on_sale: true,
          current_price: "33",
        },
        {
          token_id: 2,
          creator: "0x8731E18Bb3F551ef627Fe93Be975e2f82C9E1FC5",
          owner: "0x072a6FE107dDf14d6f2D8e1b270A0dF9d819FA4F",
          on_sale: false,
          current_price: "3",
        },
        {
          token_id: 3,
          creator: "0x072a6FE107dDf14d6f2D8e1b270A0dF9d819FA4F",
          owner: "0xB0246D3635da8c9631910e782453873C7537d802",
          on_sale: true,
          current_price: "99",
        },
        {
          token_id: 4,
          creator: "0xB0246D3635da8c9631910e782453873C7537d802",
          owner: "0x7a492874f4DeC1Dd704ef784AA58A6467F2c9074",
          on_sale: true,
          current_price: "9",
        },
        {
          token_id: 5,
          creator: "0x7a492874f4DeC1Dd704ef784AA58A6467F2c9074",
          owner: "0xB0E514c372317276a76e0214c526f3417E309d54",
          on_sale: true,
          current_price: "0.1",
        },
        {
          token_id: 6,
          creator: "0xA3F3349296174d7278DBaE42E415049cECa53339",
          owner: "0x15d1Cd04feAB63d2350408e530aE456441947eb1",
          on_sale: false,
          current_price: "0.67576327",
        },
        {
          token_id: 7,
          creator: "0xB0E514c372317276a76e0214c526f3417E309d54",
          owner: "0xA3F3349296174d7278DBaE42E415049cECa53339",
          on_sale: false,
          current_price: "0.67576327",
        },
        {
          token_id: 8,
          creator: "0xE663c1f7bBd2a35C442f469eb358437F1Fbe523D",
          owner: "0x721bA77B87CF3E15fF9d68E27dd1B4aBc860DCB",
          on_sale: true,
          current_price: "0.67576327",
        },
        {
          token_id: 9,
          creator: "0x1dB1c31E7615c76483483Ea56C00edABE2Cb1c7F",
          owner: "0x229866584D5B6FCfd2D4e97E962Db7db86B6317F",
          on_sale: false,
          current_price: "0.67576327",
        },
        {
          token_id: 10,
          creator: "0x229866584D5B6FCfd2D4e97E962Db7db86B6317F",
          owner: "0xE663c1f7bBd2a35C442f469eb358437F1Fbe523D",
          on_sale: false,
          current_price: "0.67576327",
        },
        {
          token_id: 11,
          creator: "0x229866584D5B6FCfd2D4e97E962Db7db86B6317F",
          owner: "0xE663c1f7bBd2a35C442f469eb358437F1Fbe523D",
          on_sale: false,
          current_price: "0.67576327",
        },
        {
          token_id: 12,
          creator: "0x229866584D5B6FCfd2D4e97E962Db7db86B6317F",
          owner: "0xE663c1f7bBd2a35C442f469eb358437F1Fbe523D",
          on_sale: false,
          current_price: "0.67576327",
        },
      ]);
    });
};
