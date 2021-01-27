module.exports = (sequelize, DataTypes) => {
  const Foods = sequelize.define("Foods", {
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
    image: {
      type: DataTypes.TEXT,
      field: "image",
      allowNull: true,
    },
    discount_end_time: {
      type: DataTypes.DATE,
      field: "discount_end_time",
      allowNull: true,
    },
    discount_price: {
      type: DataTypes.DECIMAL(10, 2),
      field: "discount_price",
      allowNull: true,
    },
  });

  Foods.associate = (models) => {
    const { FoodType } = models;
    Foods.belongsTo(FoodType, {
      foreignKey: "typeId",
      as: "FoodTypes",
    });
  };

  return Foods;
};
