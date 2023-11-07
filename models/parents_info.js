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
      autoIncrement: false,
      comment: null,
      field: "user_id",
      unique: "user_id_UNIQUE",
      references: {
        key: "user_id",
        model: "parents_model"
      }
    },
    father_full_name: {
      type: DataTypes.STRING(45),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "father_full_name"
    },
    mother_full_name: {
      type: DataTypes.STRING(45),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "mother_full_name"
    },
    father_num: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "father_num"
    },
    mother_num: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "mother_num"
    },
    patient_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "patient_id",
      references: {
        key: "patient_id",
        model: "child_model"
      }
    }
  };
  const options = {
    tableName: "parents_info",
    comment: "",
    indexes: [{
      name: "parent_info_patient_relation",
      unique: false,
      type: "BTREE",
      fields: ["patient_id"]
    }]
  };
  const ParentsInfoModel = sequelize.define("parents_info_model", attributes, options);
  return ParentsInfoModel;
};