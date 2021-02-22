module.exports = (sequelize, DataTypes) => {
  const Orders = sequelize.define("Orders", {
    id: {
      type: DataTypes.BIGINT,
      field: "id",
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    selected_food: {
      type: DataTypes.STRING,
      field: "selected_food",
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      field: "quantity",
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      field: "price",
      allowNull: true,
    },
  });

  return Orders;
};
