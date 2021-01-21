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
    const { Food } = models;
    FoodType.hasMany(Food, {
      foreignKey: "typeId",
      as: "Food",
    });
  };

  return FoodType;
};
