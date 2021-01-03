"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Users", {
      id: {
        type: Sequelize.BIGINT,
        field: "id",
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      first_name: {
        type: Sequelize.STRING(50),
        field: "first_name",
        allowNull: false,
      },
      last_name: {
        type: Sequelize.STRING(50),
        field: "last_name",
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(70),
        field: "email",
        allowNull: false,
        validate: {
          isEmail: true,
          isLowercase: true,
        },
        unique: true,
      },
      address: {
        type: Sequelize.STRING(60),
        field: "address",
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING(256),
        field: "password",
        allowNull: false,
      },
      roles: {
        type: Sequelize.ENUM(
          "admin",
          "restaurant_admin",
          "customer",
          "deliverer"
        ),
        field: "roles",
        allowNull: false,
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
    await queryInterface.dropTable("Users");
  },
};
