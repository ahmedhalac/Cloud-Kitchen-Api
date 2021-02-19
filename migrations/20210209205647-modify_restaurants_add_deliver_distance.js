"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Restaurants", "deliver_distance", {
      type: Sequelize.STRING,
      allowNull: true,
      field: "deliver_distance",
      defaultValue: "1",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Restaurants", "deliver_distance");
  },
};
