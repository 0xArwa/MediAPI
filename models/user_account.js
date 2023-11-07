const {
  DataTypes
} = require('sequelize');
module.exports = sequelize => {
  const attributes = {
    user_name: {
      type: DataTypes.STRING(45),
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: false,
      comment: null,
      field: "user_name",
      unique: "user_name_UNIQUE"
    },
    email: {
      type: DataTypes.STRING(60),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "email"
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "password"
    },
    role: {
      type: DataTypes.STRING(45),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "role"
    }
  };
  const options = {
    tableName: "user_account",
    comment: "",
    indexes: []
  };
  const UserAccountModel = sequelize.define("user_account_model", attributes, options);
  return UserAccountModel;
};