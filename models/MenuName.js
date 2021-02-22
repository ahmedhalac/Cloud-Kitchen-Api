module.exports = (sequelize, DataTypes) => {
  const MenuName = sequelize.define("MenuName", {
    id: {
      type: DataTypes.BIGINT,
      field: "id",
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    menu_name: {
      type: DataTypes.STRING(100),
      field: "menu_name",
      allowNull: false,
    },
  });

  MenuName.associate = (models) => {
    const { GroupMenu } = models;
    MenuName.hasOne(GroupMenu, {
      foreignKey: "menuNameId",
      as: "GroupMenu",
    });
  };

  return MenuName;
};
