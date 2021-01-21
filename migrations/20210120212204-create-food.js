"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Foods", {
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
      price: {
        type: Sequelize.DECIMAL(10, 2),
        field: "price",
        validate: {
          isDecimal: true,
        },
        allowNull: true,
      },
      ingredients: {
        type: Sequelize.STRING(245),
        field: "ingredients",
        allowNull: true,
      },
      typeId: {
        type: Sequelize.INTEGER,
        field: "typeId",
        allowNull: false,
        references: {
          model: "FoodTypes",
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
    await queryInterface.dropTable("Foods");
  },
};
