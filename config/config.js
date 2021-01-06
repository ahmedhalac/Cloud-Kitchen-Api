require("dotenv").config();
const { POSTGRES_HOST, POSTGRES_USER, POSTGRES_PW, POSTGRES_DB } = process.env;

module.exports = {
  development: {
    username: POSTGRES_USER,
    password: POSTGRES_PW,
    database: POSTGRES_DB,
    host: POSTGRES_HOST,
    dialect: "postgres",
  },
  test: {
    username: POSTGRES_USER,
    password: POSTGRES_PW,
    database: POSTGRES_DB,
    host: POSTGRES_HOST,
    dialect: "postgres",
  },
  production: {
    username: POSTGRES_USER,
    password: POSTGRES_PW,
    database: POSTGRES_DB,
    host: POSTGRES_HOST,
    dialect: "postgres",
  },
};
