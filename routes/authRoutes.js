const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/authController");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted,
    ],
    controller.signup
  );

  app.post("/api/signin", controller.signin);

  app.post("/api/add-restaurant", controller.addRestaurant);

  app.get("/api/get-restaurants", controller.getRestaurants);

  app.get("/api/get-restaurant-types", controller.getRestaurantTypes);

  app.put("/api/edit-restaurant/:restId", controller.editRestaurant);
};
