require("dotenv").config();
const { SECRET_KEY } = process.env;

module.exports = {
  secret: SECRET_KEY,
};
