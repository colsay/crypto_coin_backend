exports.seed = function (knex, Promise) {
	// Deletes ALL existing entries
	return knex("cch_transaction")
		.del()
		.then(function () {
			// Inserts seed entries
			return knex("cch_transaction").insert([
				{
					id: -3,
					from_address: "0xE663c1f7bBd2a35C442f469eb358437F1Fbe523D",
					to_address: "0x229866584D5B6FCfd2D4e97E962Db7db86B6317F",
					amount: "0.2759",
					currency: "ETH",
					category: "buy",
				},
				{
					id: -2,
					from_address: "0xB0E514c372317276a76e0214c526f3417E309d54",
					to_address: "0x8731E18Bb3F551ef627Fe93Be975e2f82C9E1FC5",
					amount: "3.8239",
					currency: "CCH",
					category: "sell",
				},
				{
					id: -1,
					from_address: "0x1dB1c31E7615c76483483Ea56C00edABE2Cb1c7F",
					to_address: "0xE663c1f7bBd2a35C442f469eb358437F1Fbe523D",
					amount: "4.529",
					currency: "ETH",
					category: "buy",
				},
			]);
		});
};
