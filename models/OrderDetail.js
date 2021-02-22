module.exports = (sequelize, DataTypes) => {
  const OrderDetail = sequelize.define("OrderDetail", {
    id: {
      type: DataTypes.BIGINT,
      field: "id",
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: {
      type: DataTypes.STRING,
      field: "first_name",
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      field: "last_name",
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      field: "email",
      allowNull: true,
      validate: {
        isEmail: true,
        isLowercase: true,
      },
      unique: true,
    },
    phone: {
      type: DataTypes.STRING,
      field: "phone",
      allowNull: false,
    },
    payment_type: {
      type: DataTypes.STRING,
      field: "payment_type",
      allowNull: true,
    },
    order_time: {
      type: DataTypes.TIME,
      field: "order_time",
      allowNull: true,
    },
    note: {
      type: DataTypes.TEXT,
      field: "note",
      allowNull: true,
    },
  });

  return OrderDetail;
};
