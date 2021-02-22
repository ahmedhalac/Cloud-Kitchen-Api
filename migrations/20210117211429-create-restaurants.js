"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Restaurants", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING(100),
        field: "name",
        allowNull: false,
      },
      address: {
        type: Sequelize.STRING(60),
        field: "address",
        allowNull: false,
      },
      city: {
        type: Sequelize.STRING(60),
        field: "city",
        allowNull: false,
      },
      stars: {
        type: Sequelize.INTEGER,
        field: "stars",
        allowNull: true,
      },
      typeId: {
        type: Sequelize.INTEGER,
        field: "typeId",
        allowNull: false,
        references: {
          model: "RestaurantTypes",
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
    await queryInterface.dropTable("Restaurants");
  },
};
