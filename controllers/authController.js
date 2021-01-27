const {
  User,
  Restaurant,
  RestaurantType,
  Foods,
  FoodType,
} = require("../models");
const config = require("../config/authConfig");

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

//REGISTRATION
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

//LOGIN
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

//ADD restaurants to database
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

//Add Restaurant Type to DB
exports.addRestaurnatType = (req, res) => {
  RestaurantType.create({
    name: req.body.name,
  })
    .then((restaurantType) => {
      res.send({ message: "Tip resotorana je dodan!" });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

//Get all Restaurants from DB
exports.getRestaurants = (req, res) => {
  Restaurant.findAll({
    attributes: ["id", "name", "address", "city", "stars", "typeId"],
    order: [["id", "ASC"]],
  })
    .then((restaurants) => {
      res.send(restaurants);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

//GET all Restaurant Types from DB
exports.getRestaurantTypes = (req, res) => {
  RestaurantType.findAll({
    attributes: ["id", "name"],
    order: [["id", "ASC"]],
  })
    .then((restaurantTypes) => {
      res.send(restaurantTypes);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

//Edit Restaurant
exports.editRestaurant = (req, res) => {
  Restaurant.update(
    {
      name: req.body.name,
      address: req.body.address,
      city: req.body.city,
      stars: req.body.stars,
      typeId: req.body.typeId,
    },
    {
      where: { id: req.params.restId },
      order: [["id", "ASC"]],
      returning: true,
    }
  )
    .then((user) => {
      res.send({ message: "Podaci restorana su promijenjeni!" });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

//Edit Restaurant Type
exports.editRestaurantType = (req, res) => {
  RestaurantType.update(
    {
      name: req.body.name,
    },
    {
      where: { id: req.params.restTypeId },
      order: [["id", "ASC"]],
      returning: true,
    }
  )
    .then((resType) => {
      res.send({ message: "Ime tipa restorana je promijenjeno!" });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

//Add Food to DB
exports.addFood = (req, res) => {
  Foods.create({
    name: req.body.name,
    price: req.body.price,
    ingredients: req.body.ingredients,
    typeId: req.body.typeId,
    image: req.body.image,
    discount_end_time: req.body.discount_end_time,
    discount_price: req.body.discount_price,
  })
    .then((food) => {
      res.send({ message: "Hrana je dodana uspješno!" });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

//GET Food from DB
exports.getFood = (req, res) => {
  Foods.findAll({
    order: [["id", "ASC"]],
  })
    .then((food) => {
      res.send(food);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

//Add Food Type to DB
exports.addFoodType = (req, res) => {
  FoodType.create({
    name: req.body.name,
  })
    .then((foodType) => {
      res.send({ message: "Tip hrane je dodan." });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

//GET Food Type from DB
exports.getFoodType = (req, res) => {
  FoodType.findAll({
    attributes: ["id", "name"],
    order: [["id", "ASC"]],
  })
    .then((foodType) => {
      res.send(foodType);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.editFoodType = (req, res) => {
  FoodType.update(
    {
      name: req.body.name,
    },
    {
      where: { id: req.params.foodTypeId },
      order: [["id", "ASC"]],
      returning: true,
    }
  )
    .then((resType) => {
      res.send({ message: "Ime tipa hrane je promijenjeno!" });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

//DELETE Retstaurant Type
exports.deleteRestType = (req, res) => {
  RestaurantType.destroy({
    where: { id: req.params.restTypeId },
  })
    .then((resType) => {
      res.send({ message: "Tip restorana je obrisan!" });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.deleteFoodType = (req, res) => {
  FoodType.destroy({
    where: { id: req.params.foodTypeId },
  })
    .then((foodType) => {
      res.send({ message: "Tip hrane je obrisan!" });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
