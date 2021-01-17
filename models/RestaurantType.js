module.exports = (sequelize, DataTypes) => {
  const RestaurantType = sequelize.define("RestaurantType", {
    id: {
      type: DataTypes.BIGINT,
      field: "id",
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
      field: "name",
      allowNull: false,
    },
  });

  RestaurantType.associate = (models) => {
    const { Restaurant } = models;
    RestaurantType.hasMany(Restaurant, {
      foreignKey: "typeId",
      as: "Restaurant",
    });
  };

  return RestaurantType;
};
