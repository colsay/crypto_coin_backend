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

const knex = require("knex")({
  client: "postgresql",
  connection: {
    database: process.env.DATABASE,
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
  },
});

const metadataRouter = require("./routers/MetadataRouter")(express);
app.use("/", metadataRouter);

// const CovidService = require("./services/CovidService");
// const CovidRouter = require("./routers/CovidRouter");

// const covidService = new CovidService();

// app.use("/api/covid/", new CovidRouter(covidService).router());

app.listen(port, () => {
  console.log(`Application listening to port ${port}`);
});

module.exports.app = app;
