require("dotenv").config();
const { POSTGRES_HOST, POSTGRES_USER, POSTGRES_PW, POSTGRES_DB } = process.env;
const Sequelize = require("sequelize");
const { DataTypes } = Sequelize;
const sequelize = new Sequelize(POSTGRES_DB, POSTGRES_USER, POSTGRES_PW, {
  host: POSTGRES_HOST,
  dialect: "postgres",
  operatorsAliases: "false",

  pool: {
    max: 5,
    min: 0,
    acquire: 3000,
    idle: 10000,
  },
});

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require("../models/User.js")(sequelize, DataTypes);

db.ROLES = ["admin", "restaurant_admin", "customer", "deliverer"];

module.exports = db;
