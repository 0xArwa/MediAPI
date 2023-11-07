const {
  DataTypes
} = require('sequelize');
module.exports = sequelize => {
  const attributes = {
    record_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "record_id",
      references: {
        key: "record_id",
        model: "treatment_record_model"
      }
    },
    med_name: {
      type: DataTypes.STRING(60),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "med_name"
    },
    start_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "start_date"
    },
    dosage_amount: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "dosage_amount"
    },
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "id"
    }
  };
  const options = {
    tableName: "medication",
    comment: "",
    indexes: [{
      name: "patient_id_idx",
      unique: false,
      type: "BTREE",
      fields: ["record_id"]
    }]
  };
  const MedicationModel = sequelize.define("medication_model", attributes, options);
  return MedicationModel;
};