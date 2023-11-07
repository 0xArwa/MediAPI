const {
  DataTypes
} = require('sequelize');
module.exports = sequelize => {
  const attributes = {
    report_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "report_id",
      unique: "report_id_UNIQUE"
    },
    issue_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: sequelize.fn('current_timestamp'),
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "issue_date"
    },
    report_content: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "report_content"
    },
    objectiveFindings: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "objectiveFindings"
    },
    patient_name: {
      type: DataTypes.STRING(60),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "patient_name"
    },
    doc_notes: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "doc_notes"
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
    doc_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "doc_id",
      references: {
        key: "doc_ID",
        model: "physician_model"
      }
    }
  };
  const options = {
    tableName: "report",
    comment: "",
    indexes: [{
      name: "patient_id_idx",
      unique: false,
      type: "BTREE",
      fields: ["patient_id"]
    }, {
      name: "doc_ID_idx",
      unique: false,
      type: "BTREE",
      fields: ["doc_id"]
    }]
  };
  const ReportModel = sequelize.define("report_model", attributes, options);
  return ReportModel;
};