"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Foods", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        field: "id",
      },
      name: {
        type: Sequelize.STRING(100),
        field: "name",
        allowNull: false,
      },
      price: {
        type: Sequelize.DECIMAL(10, 2),
        field: "price",
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
      image: {
        type: Sequelize.TEXT,
        allowNull: true,
        field: "image",
      },
      discount_end_time: {
        type: Sequelize.DATE,
        allowNull: true,
        field: "discount_end_time",
      },
      discount_price: {
        type: Sequelize.DECIMAL(10, 2),
        field: "discount_price",
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
    await queryInterface.dropTable("Foods");
  },
};
