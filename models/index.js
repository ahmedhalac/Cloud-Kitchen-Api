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
db.Restaurant = require("../models/Restaurant")(sequelize, DataTypes);
db.RestaurantType = require("../models/RestaurantType")(sequelize, DataTypes);
db.FoodType = require("../models/FoodType")(sequelize, DataTypes);
db.Foods = require("../models/Food")(sequelize, DataTypes);
db.GroupMenu = require("../models/GroupMenu")(sequelize, DataTypes);
db.MenuName = require("../models/MenuName")(sequelize, DataTypes);
db.Orders = require("../models/Order")(sequelize, DataTypes);
db.OrderDetail = require("../models/OrderDetail")(sequelize, DataTypes);

db.ROLES = ["admin", "restaurant_admin", "customer", "deliverer"];

module.exports = db;
