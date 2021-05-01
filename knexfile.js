// Update with your config settings.
require("dotenv").config();
module.exports = {
  development: {
    client: "postgresql",
    connection: {
      database: process.env.database,
      user: process.env.user,
      password: process.env.password,
    },
    migrations: {
      directory: __dirname + "/migrations",
    },
  },
  production: {
    client: "postgresql",
    connection: {
      database: process.env.database,
      user: process.env.user,
      password: process.env.password,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: __dirname + "/migrations",
    },
  },
};
