exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        {
          id: 1,
          alias: "David Robinson",
          address: "0x8731E18Bb3F551ef627Fe93Be975e2f82C9E1FC5",
        },
        {
          id: 2,
          alias: "Cristiano Ronaldo",
          address: "0x229866584D5B6FCfd2D4e97E962Db7db86B6317F",
        },
        {
          id: 3,
          alias: "Tornado Buster",
          address: "0xE663c1f7bBd2a35C442f469eb358437F1Fbe523D",
        },
        {
          id: 4,
          alias: "Big Sam",
          address: "0xA3F3349296174d7278DBaE42E415049cECa53339",
        },
        {
          id: 5,
          alias: "Darren Fletcher",
          address: "0x7a492874f4DeC1Dd704ef784AA58A6467F2c9074",
        },
        {
          id: 6,
          alias: "Vince Carter",
          address: "0xB0246D3635da8c9631910e782453873C7537d802",
        },
        {
          id: 7,
          alias: "Clemenceua DeJorge",
          address: "0x072a6FE107dDf14d6f2D8e1b270A0dF9d819FA4F",
        },
        {
          id: 8,
          alias: "Queue Paki",
          address: "0xB0E514c372317276a76e0214c526f3417E309d54",
        },
        {
          id: 9,
          alias: "Paul George",
          address: "0x15d1Cd04feAB63d2350408e530aE456441947eb1",
        },
        {
          id: 10,
          alias: "Thug Rose",
          address: "0x721bA77B87CF3E15fF9d68E27dd1B4aBc860DCB",
        },
      ]);
    });
};
