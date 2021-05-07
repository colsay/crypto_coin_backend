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

const profileRouter = require("./routers/ProfileRouter")(express);
const cchTransactionRouter = require("./routers/transactionRouter")(express);
const createRouter = require("./routers/CreateRouter")(express);
const nftItemRouter = require("./routers/NftItemRouter")(express);
const nftTransactionRouter = require("./routers/NftTransactionRouter")(express);
const userRouter = require("./routers/UserRouter")(express);

app.use("/profile", profileRouter);
app.use("/items", nftItemRouter);
app.use("/nfttransaction", nftTransactionRouter);
app.use("/displayname", userRouter);
app.use("/transaction", cchTransactionRouter);
app.use("/upload", createRouter);

app.get("/test", function (req, res) {
  res.send("hello world");
});

app.listen(port, () => {
  console.log(`Application listening to port ${port}`);
});

module.exports.app = app;
