module.exports = (sequelize, DataTypes) => {
  const Restaurant = sequelize.define("Restaurant", {
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
    address: {
      type: DataTypes.STRING(60),
      field: "address",
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING(60),
      field: "city",
      allowNull: false,
    },
    stars: {
      type: DataTypes.INTEGER,
      field: "stars",
    },
    typeId: {
      type: DataTypes.INTEGER,
      field: "typeId",
      allowNull: false,
    },
    deliver_distance: {
      type: DataTypes.STRING,
      field: "deliver_distance",
      defaultValue: "1",
      allowNull: true,
    },
  });

  Restaurant.associate = (models) => {
    const { RestaurantType, GroupMenu } = models;
    Restaurant.belongsTo(RestaurantType, {
      foreignKey: "typeId",
      as: "restaurant_type",
    });
    Restaurant.hasMany(GroupMenu, {
      foreignKey: "restaurantId",
      as: "GroupMenu",
    });
  };

  return Restaurant;
};
