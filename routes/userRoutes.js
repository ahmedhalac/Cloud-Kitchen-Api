const { authJwt } = require("../middlewares");
const controller = require("../controllers/userController");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token. Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/api/admin",
    authJwt.verifyToken,
    authJwt.isAdmin,
    controller.adminBoard
  );

  app.get(
    "/api/customer",
    [authJwt.verifyToken, authJwt.isCustomer],
    controller.customerBoard
  );

  app.get(
    "/api/restaurant_admin",
    [authJwt.verifyToken, authJwt.isRestaurantAdmin],
    controller.restaurantAdminBoard
  );

  app.get(
    "/api/deliverer",
    [authJwt.verifyToken, authJwt.isDeliverer],
    controller.delivererBoard
  );
};
