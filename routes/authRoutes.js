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

  //POST
  app.post("/api/signin", controller.signin);

  app.post("/api/add-restaurant", controller.addRestaurant);

  app.post("/api/add-restaurant-type", controller.addRestaurnatType);

  app.post("/api/add-food-type", controller.addFoodType);

  app.post("/api/add-food", controller.addFood);

  app.post("/api/add-menu-name", controller.addMenuName);

  app.post("/api/add-group-menu", controller.addGroupMenu);

  //GET
  app.get("/api/get-restaurants", controller.getRestaurants);

  app.get("/api/get-restaurant-types", controller.getRestaurantTypes);

  app.get("/api/get-food-type", controller.getFoodType);

  app.get("/api/get-food", controller.getFood);

  app.get("/api/get-menu-name", controller.getMenuName);

  app.get("/api/get-group-menus", controller.getGroupMenus);

  //PUT
  app.put("/api/edit-restaurant/:restId", controller.editRestaurant);

  app.put(
    "/api/edit-restaurant-type/:restTypeId",
    controller.editRestaurantType
  );

  app.put("/api/edit-food-type/:foodTypeId", controller.editFoodType);

  //DELETE
  app.delete(
    "/api/delete-restaurant-type/:restTypeId",
    controller.deleteRestType
  );

  app.delete("/api/delete-food-type/:foodTypeId", controller.deleteFoodType);
};
