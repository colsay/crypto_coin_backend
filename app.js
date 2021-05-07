require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const port = process.env.PORT || 8000;
const app = express();
const fileupload = require("express-fileupload");
// const imgur = require("imgur");

app.use(fileupload());
// app.use(morgan("combined"));
app.use(morgan("short"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const metadataRouter = require("./routers/MetadataRouter")(express);
const cchTransactionRouter = require("./routers/transactionRouter")(express);
const createRouter = require("./routers/CreateRouter")(express);
const nftItemRouter = require("./routers/NftItemRouter")(express);
const nftTransactionRouter = require("./routers/NftTransactionRouter")(express);
const userRouter = require("./routers/UserRouter")(express);

// Knex Setup
const knexConfig = require("./knexfile").development;
const knex = require("knex")(knexConfig);
const MetadataService = require("./services/MetadataService");
const metadataService = new MetadataService(knex);

app.use("/", metadataRouter);
app.use("/items", nftItemRouter);
app.use("/", nftTransactionRouter);
app.use("/profile/displayname", userRouter);
app.use("/transaction", cchTransactionRouter);
app.use("/upload", createRouter);

app.get("/test", function (req, res) {
  res.send("hello world");
});

//TODO: Need to place somewhere else
app.get("/profile/:walletAddress", getSellerNft);
function getSellerNft(req, res) {
  console.log("getsellerNFT");
  return metadataService
    .listSellerNftData(req.params.walletAddress)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.status(500).json(err));
}

app.listen(port, () => {
  console.log(`Application listening to port ${port}`);
});

module.exports.app = app;
