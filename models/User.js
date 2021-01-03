module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    id: {
      type: DataTypes.BIGINT,
      field: "id",
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: {
      type: DataTypes.STRING(50),
      field: "first_name",
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING(50),
      field: "last_name",
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(70),
      field: "email",
      allowNull: false,
      validate: {
        isEmail: true,
        isLowercase: true,
      },
      unique: true,
    },
    address: {
      type: DataTypes.STRING(60),
      field: "address",
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(256),
      field: "password",
      allowNull: false,
    },
    roles: {
      type: DataTypes.STRING,
      field: "roles",
      allowNull: false,
    },
  });

  return User;
};
