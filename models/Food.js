module.exports = (sequelize, DataTypes) => {
  const Food = sequelize.define("Food", {
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
    price: {
      type: DataTypes.DECIMAL(10, 2),
      field: "price",
      validate: {
        isDecimal: true,
      },
      allowNull: true,
    },
    ingredients: {
      type: DataTypes.STRING(245),
      field: "ingredients",
      allowNull: true,
    },
    typeId: {
      type: DataTypes.INTEGER,
      field: "typeId",
      allowNull: false,
    },
  });

  Food.associate = (models) => {
    const { FoodType } = models;
    Food.belongsTo(FoodType, {
      foreignKey: "typeId",
      as: "FoodType",
    });
  };

  return Food;
};
