const {
  DataTypes
} = require('sequelize');
module.exports = sequelize => {
  const attributes = {
    doc_ID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "doc_ID",
      unique: "doc_ID_UNIQUE"
    },
    first_name: {
      type: DataTypes.STRING(45),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "first_name"
    },
    last_name: {
      type: DataTypes.STRING(45),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "last_name"
    },
    username_: {
      type: DataTypes.STRING(45),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "username_",
      references: {
        key: "user_name",
        model: "user_account_model"
      }
    }
  };
  const options = {
    tableName: "physician",
    comment: "",
    indexes: [{
      name: "user_name_idx",
      unique: false,
      type: "BTREE",
      fields: ["username_"]
    }]
  };
  const PhysicianModel = sequelize.define("physician_model", attributes, options);
  return PhysicianModel;
};