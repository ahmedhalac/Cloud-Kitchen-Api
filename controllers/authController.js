const {
  User,
  Restaurant,
  RestaurantType,
  Foods,
  FoodType,
  MenuName,
  GroupMenu,
  Orders,
  OrderDetail,
} = require("../models");
const config = require("../config/authConfig");
const nodemailer = require("nodemailer");
require("dotenv").config();
const { GMAIL_EMAIL, GMAIL_PASSWORD } = process.env;
var smtpTransport = require("nodemailer-smtp-transport");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

//connection with db
var pg = require("pg");
require("dotenv").config();
const { POSTGRES_HOST, POSTGRES_USER, POSTGRES_DB, POSTGRES_PW } = process.env;
var configDB = {
  user: POSTGRES_USER,
  database: POSTGRES_DB,
  password: POSTGRES_PW,
  host: POSTGRES_HOST,
  port: 5432,
  max: 100,
  idleTimeoutMills: 30000,
};

var pool = new pg.Pool(configDB);

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

/*
//Get all Restaurants from DB
exports.getRestaurants = (req, res) => {
  Restaurant.findAll({
    attributes: [
      "id",
      "name",
      "address",
      "city",
      "stars",
      "typeId",
      "deliver_distance",
    ],
    order: [["id", "ASC"]],
  })
    .then((restaurants) => {
      res.send(restaurants);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};*/
//GET restaurants
exports.getRestaurants = (req, res) => {
  pool
    .query(
      `SELECT R.id, R.name, R.address, R.city, R.stars, RT.name as rt_name, R.deliver_distance FROM "Restaurants" R
      INNER JOIN "RestaurantTypes" RT on RT.id = R."typeId";
    `
    )
    .then((restaurant) => {
      res.send(restaurant.rows);
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
      deliver_distance: req.body.deliver_distance,
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

//ADD menu name
exports.addMenuName = (req, res) => {
  MenuName.create({
    menu_name: req.body.menu_name,
  })
    .then((menu_name) => {
      res.send({ message: "Ime menija dodano!" });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

//GET Nenu name
exports.getMenuName = (req, res) => {
  MenuName.findAll({
    attributes: ["id", "menu_name"],
    order: [["id", "ASC"]],
  })
    .then((menu_name) => {
      res.send(menu_name);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

//ADD group menu
exports.addGroupMenu = (req, res) => {
  GroupMenu.create({
    restaurantId: req.body.restaurantId,
    menuNameId: req.body.menuNameId,
    foodId: req.body.foodId,
  })
    .then((group_menu) => {
      res.send({ message: "Grupni meni dodan!" });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

//GET group menus
exports.getGroupMenus = (req, res) => {
  pool
    .query(
      `SELECT R.name AS res_name, MN.menu_name, F.name as food_name, F.price FROM "GroupMenus" G
      INNER JOIN "Restaurants" R ON R.id = G."restaurantId"
      INNER JOIN "MenuNames" MN ON MN.id = G."menuNameId"
      INNER JOIN "Foods" F ON F.id = G."foodId"
      WHERE "restaurantId" IN (
        SELECT "restaurantId" FROM "GroupMenus"
        GROUP BY "restaurantId"
        HAVING COUNT(id) > 1)
      AND "menuNameId" IN (
        SELECT "menuNameId" FROM "GroupMenus"
        GROUP BY "menuNameId"
        HAVING COUNT(id) > 1
        );
    `
    )
    .then((group_menus) => {
      res.send(group_menus.rows);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

//GET group menus
exports.getOrderData = (req, res) => {
  pool
    .query(
      `SELECT FT.name AS food_type, F.name AS food_name, F.ingredients, F.price, F.image, F.id FROM "Foods" AS F
      INNER JOIN "FoodTypes" FT ON FT.id = F."typeId";
    `
    )
    .then((orderData) => {
      res.send(orderData.rows);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

//ADD order
exports.addOrder = (req, res) => {
  Orders.create({
    selected_food: req.body.selected_food,
    quantity: req.body.quantity,
    price: req.body.price,
  })
    .then((order) => {
      res.send({ message: "Narudžba dodana!" });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

//GET Nenu name
exports.getOrders = (req, res) => {
  Orders.findAll({
    attributes: ["id", "selected_food", "quantity", "price"],
    order: [["id", "ASC"]],
  })
    .then((orders) => {
      res.send(orders);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

//DELETE order
exports.deleteOrder = (req, res) => {
  Orders.destroy({
    where: { id: req.params.orderId },
  })
    .then((order) => {
      res.send({ message: "Artikal narudžbe je obrisan!" });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

//ADD order details
exports.addOrderDetails = (req, res) => {
  console.log("DOSO");
  OrderDetail.create({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    phone: req.body.phone,
    payment_type: req.body.payment_type,
    order_time: req.body.order_time,
    note: req.body.note,
  })
    .then(async (order) => {
      const sendEmail = async (email) => {
        console.log(email);
        var transporter = nodemailer.createTransport(
          smtpTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            auth: {
              user: GMAIL_EMAIL,
              pass: GMAIL_PASSWORD,
            },
          })
        );

        // send mail with defined transport object
        let info = await transporter.sendMail({
          from: '"Cloud Kitchen" <cloudkitchen44@gmail.com>', // sender address
          to: email, // list of receivers
          subject: "Narudžba hrane", // Subject line
          text: "Uspješno ste naručili hranu.", // plain text body
          html: "<b>Uspješno ste naručili hranu.</b>", // html body
        });

        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // Preview only available when sending through an Ethereal account
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
      };
      await sendEmail(order.email);

      res.send({ message: "Narudžba dodana!" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: err.message });
    });
};
