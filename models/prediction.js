const {
  DataTypes
} = require('sequelize');
module.exports = sequelize => {
  const attributes = {
    patient_ID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: false,
      comment: null,
      field: "patient_ID",
      references: {
        key: "patient_id",
        model: "treatment_record_model"
      }
    },
    pred: {
      type: DataTypes.STRING(45),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "pred"
    }
  };
  const options = {
    tableName: "prediction",
    comment: "",
    indexes: []
  };
  const PredictionModel = sequelize.define("prediction_model", attributes, options);
  return PredictionModel;
};