const {
  DataTypes
} = require('sequelize');
module.exports = sequelize => {
  const attributes = {
    patient_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "patient_id"
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
    gender: {
      type: DataTypes.STRING(1),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "gender"
    },
    birth_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "birth_date"
    },
    docID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "docID",
      references: {
        key: "doc_ID",
        model: "physician_model"
      }
    }
  };
  const options = {
    tableName: "child",
    comment: "",
    indexes: [{
      name: "docID",
      unique: false,
      type: "BTREE",
      fields: ["docID"]
    }]
  };
  const ChildModel = sequelize.define("child_model", attributes, options);
  return ChildModel;
};