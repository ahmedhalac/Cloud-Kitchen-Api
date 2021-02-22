"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("OrderDetails", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      first_name: {
        type: Sequelize.STRING,
        field: "first_name",
        allowNull: false,
      },
      last_name: {
        type: Sequelize.STRING,
        field: "last_name",
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        field: "email",
        allowNull: true,
        validate: {
          isEmail: true,
          isLowercase: true,
        },
        unique: true,
      },
      phone: {
        type: Sequelize.STRING,
        field: "phone",
        allowNull: false,
      },
      payment_type: {
        type: Sequelize.STRING,
        field: "payment_type",
        allowNull: true,
      },
      order_time: {
        type: Sequelize.TIME,
        field: "order_time",
        allowNull: true,
      },
      note: {
        type: Sequelize.TEXT,
        field: "note",
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
    await queryInterface.dropTable("OrderDetails");
  },
};
