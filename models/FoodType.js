module.exports = (sequelize, DataTypes) => {
  const FoodType = sequelize.define("FoodType", {
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

  FoodType.associate = (models) => {
    const { Foods } = models;
    FoodType.hasMany(Foods, {
      foreignKey: "typeId",
      as: "Foods",
    });
  };

  return FoodType;
};
