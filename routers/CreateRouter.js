"use strict";
module.exports = (express) => {
	const router = express.Router();
	const multer = require("multer");
	const rp = require("request-promise");
	require("dotenv").config();

	var upload = multer({
		fileFilter: (req, file, cb) => {
			if (file.mimetype == "image/png") {
				cb(null, true);
			} else {
				cb(null, false);
				return cb(new Error("Allowed only .png"));
			}
		},
	});

	// Knex Setup
	const CreateSql = require("../services/cchTransferService");
	const createsql = new CreateSql("transaction");

	const newNFTInfo = (req, res) => {
		console.log("yo", req.body);
		// table.integer("token_id").unique();
		// table.varchar("name");
		// table.varchar("collection");
		// table.string("asset_id");
		// table.text("image");
		// table.text("description");
		// table.text("external_url");
	};

	router.post(
		"/uploadimgur",
		upload.single("image"),
		async function (req, res) {
			// console.log("hi", req);
			const file = req.files.file;
			console.log("hi", file);
			// const encodedFile = file.data.toString("base64");
			// console.log("g9g", encodedFile);

			// var options = {
			// 	method: "POST",
			// 	url: "https://api.imgur.com/3/image",
			// 	headers: {
			// 		Authorization: `Client-ID ${process.env.imgurCID}`,
			// 	},
			// 	formData: {
			// 		image: encodedFile,
			// 	},
			// };

			// await rp(options, function (error, response) {
			// 	if (error) throw new Error(error);
			// 	let imageURL = response.body;
			// 	let imgurURL = JSON.parse(imageURL).data.link;
			// 	console.log(imgurURL);
			// });
			res.send("uploadimg");
			// res.send("helqowf");
		}
	);

	router.post("/newnftinfo", newNFTInfo);
	return router;
};
