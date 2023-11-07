const {
  DataTypes
} = require('sequelize');
module.exports = sequelize => {
  const attributes = {
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "user_id",
      unique: "user_id_UNIQUE"
    },
    first_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "first_name"
    },
    last_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "last_name"
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "address"
    },
    country: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "country"
    },
    postalCode: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "postalCode"
    },
    city: {
      type: DataTypes.STRING(45),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "city"
    },
    patient_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "patient_id",
      references: {
        key: "patient_id",
        model: "child_model"
      }
    },
    user_name: {
      type: DataTypes.STRING(45),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "user_name",
      references: {
        key: "user_name",
        model: "user_account_model"
      }
    }
  };
  const options = {
    tableName: "parents",
    comment: "",
    indexes: [{
      name: "user_name_idx",
      unique: false,
      type: "BTREE",
      fields: ["user_name"]
    }, {
      name: "parents_child_relation",
      unique: false,
      type: "BTREE",
      fields: ["patient_id"]
    }]
  };
  const ParentsModel = sequelize.define("parents_model", attributes, options);
  return ParentsModel;
};