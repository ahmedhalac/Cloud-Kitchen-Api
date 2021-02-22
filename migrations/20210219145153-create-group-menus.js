"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("GroupMenus", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      restaurantId: {
        type: Sequelize.INTEGER,
        field: "restaurantId",
        allowNull: false,
        references: {
          model: "Restaurants",
          key: "id",
          onDelete: "CASCADE",
        },
      },
      menuNameId: {
        type: Sequelize.INTEGER,
        field: "menuNameId",
        allowNull: false,
        references: {
          model: "MenuNames",
          key: "id",
          onDelete: "CASCADE",
        },
      },
      foodId: {
        type: Sequelize.INTEGER,
        field: "foodId",
        allowNull: false,
        references: {
          model: "Foods",
          key: "id",
          onDelete: "CASCADE",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("GroupMenus");
  },
};
