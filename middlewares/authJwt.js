const config = require("../config/authConfig.js");
const jwt = require("jsonwebtoken");
const { ROLES, User, db } = require("../models");

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({
      mesage: "No token provided!",
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }

    req.userId = decoded.id;
    return next();
  });
};

isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    if (ROLES.some((role) => role === user.roles)) {
      if (user.roles === ROLES[0]) {
        return next();
      }
    } else {
      res.status(403).send({
        message: "Require Admin Role!",
      });
    }
  });
};

isRestaurantAdmin = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    if (ROLES.some((role) => role === user.roles)) {
      if (user.roles === ROLES[1]) {
        return next();
      }
    } else {
      res.status(403).send({
        message: "Require Restaurant-Admin Role!",
      });
    }
  });
};

isCustomer = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    if (ROLES.some((role) => role === user.roles)) {
      if (user.roles === ROLES[2]) {
        return next();
      }
    } else {
      res.status(403).send({
        message: "Require Customer Role!",
      });
    }
  });
};

isDeliverer = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    if (ROLES.some((role) => role === user.roles)) {
      if (user.roles === ROLES[3]) {
        return next();
      }
    } else {
      res.status(403).send({
        message: "Require Deliverer Role!",
      });
    }
  });
};

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isRestaurantAdmin: isRestaurantAdmin,
  isCustomer: isCustomer,
  isDeliverer: isDeliverer,
};

module.exports = authJwt;
