require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");

const morgan = require("morgan");
const cors = require("cors");
const port = process.env.PORT || 8000;

const app = express();
app.use(bodyParser.json());
app.use(morgan("combined"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const metadataRouter = require("./routers/MetadataRouter")(express);
const transactionRouter = require("./routers/transactionRouter")(express);
app.use("/", metadataRouter);
app.use("/transaction", transactionRouter);

app.listen(port, () => {
	console.log(`Application listening to port ${port}`);
});

module.exports.app = app;
