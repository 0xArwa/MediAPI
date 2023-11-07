const {
  DataTypes
} = require('sequelize');
module.exports = sequelize => {
  const attributes = {
    record_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "record_id",
      unique: "record_id_UNIQUE"
    },
    diagnosis_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "diagnosis_date"
    },
    doc_managed: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "doc_managed",
      references: {
        key: "doc_ID",
        model: "physician_model"
      }
    },
    patient_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "patient_id",
      unique: "patient_id_UNIQUE",
      references: {
        key: "patient_id",
        model: "child_model"
      }
    }
  };
  const options = {
    tableName: "treatment_record",
    comment: "",
    indexes: [{
      name: "doc_ID_idx",
      unique: false,
      type: "BTREE",
      fields: ["doc_managed"]
    }, {
      name: "patient_id_idx",
      unique: false,
      type: "BTREE",
      fields: ["patient_id"]
    }]
  };
  const TreatmentRecordModel = sequelize.define("treatment_record_model", attributes, options);
  return TreatmentRecordModel;
};