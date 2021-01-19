const { User, Restaurant, RestaurantType } = require("../models");
const config = require("../config/authConfig");

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  //Save user in DB
  User.create({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    address: req.body.address,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    roles: req.body.roles,
  })
    .then((user) => {
      res.send({ message: "Korisnik je uspješno registrovan!" });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "Korisnik nije pronađen." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Pogrešna lozinka!",
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400, //24 hours
      });

      res.status(200).send({
        id: user.id,
        email: user.email,
        roles: user.roles,
        accessToken: token,
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.addRestaurant = (req, res) => {
  Restaurant.create({
    name: req.body.name,
    address: req.body.address,
    city: req.body.city,
    typeId: req.body.typeId,
    stars: req.body.stars,
  })
    .then((restaurant) => {
      res.send({ message: "Restoran je dodan uspješno!" });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.getRestaurantTypes = (req, res) => {
  RestaurantType.findAll({
    attributes: ["id", "name"],
  })
    .then((restaurantTypes) => {
      res.send(restaurantTypes);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.getRestaurants = (req, res) => {
  Restaurant.findAll({
    attributes: ["name", "address", "city", "stars", "typeId"],
  })
    .then((restaurants) => {
      res.send(restaurants);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.editRestaurant = (req, res) => {
  const { restId } = req.params;
  Restaurant.update(
    {
      name: req.body.name,
      address: req.body.address,
      city: req.body.city,
      stars: req.body.stars,
      typeId: req.body.typeId,
    },
    {
      returning: true,
      where: { id: restId },
    }
  )
    .then(([rowsUpdate, [updatedRestaurant]]) => {
      res.send(updatedRestaurant);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
