"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Orders", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      selected_food: {
        type: Sequelize.STRING,
        field: "selected_food",
        allowNull: false,
      },
      quantity: {
        type: Sequelize.INTEGER,
        field: "quantity",
        allowNull: false,
      },
      price: {
        type: Sequelize.DECIMAL(10, 2),
        field: "price",
        allowNull: true,
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
    await queryInterface.dropTable("Orders");
  },
};
