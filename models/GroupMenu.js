module.exports = (sequelize, DataTypes) => {
  const GroupMenu = sequelize.define("GroupMenu", {
    id: {
      type: DataTypes.BIGINT,
      field: "id",
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    restaurantId: {
      type: DataTypes.INTEGER,
      field: "restaurantId",
      allowNull: false,
    },
    menuNameId: {
      type: DataTypes.INTEGER,
      field: "menuNameId",
      allowNull: false,
    },
    foodId: {
      type: DataTypes.INTEGER,
      field: "foodId",
      allowNull: false,
    },
  });

  GroupMenu.associate = (models) => {
    const { Restaurant } = models;
    GroupMenu.belongsTo(Restaurant, {
      foreignKey: "restaurantId",
      as: "Restaurant",
    });
  };

  return GroupMenu;
};
