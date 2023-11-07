
module.exports = async () => {
    console.log('setting associations...')
    //--------------child--------------------
    Child.hasMany(Prediction,{foreignKey:'patient_ID',as:'predictions'})
    Prediction.belongsTo(Child,{foreignKey:'patient_ID',as:'patient'})

    Parents.hasMany(Child,{foreignKey:'patient_id',as:'children'})
    Child.belongsTo(Parents,{foreignKey:'patient_id',as:'parents'})

    Physician.hasMany(Child,{foreignKey:'docID',as:'patients'})
    Child.belongsTo(Physician,{foreignKey:'docID',as:'physician'})

    Child.hasMany(Treatment_Record,{foreignKey:'patient_id',as:'treatments'})
    Treatment_Record.belongsTo(Child,{foreignKey:'patient_id',as:'patient'})

    Child.hasMany(Report,{foreignKey:'patient_id',as:'reports'})
    Report.belongsTo(Child,{foreignKey:'patient_id',as:'patient'})

    //--------------user---------------------
    User_Account.hasMany(Parents,{foreignKey:'user_name',as:'parents'})
    Parents.belongsTo(User_Account,{foreignKey:'user_name',as:'user'})

    User_Account.hasMany(Admin,{foreignKey:'user_name',as:'admins'})
    Admin.belongsTo(User_Account,{foreignKey:'user_name',as:'user'})

    User_Account.hasMany(Physician,{foreignKey:'username_',as:'physicians'})
    Physician.belongsTo(User_Account,{foreignKey:'username_',as:'user'})

    //--------------parent-------------------
    Parents_Info.hasMany(Parents,{foreignKey:'user_id',as:'parents'})
    Parents.belongsTo(Parents_Info,{foreignKey:'user_id',as:'info'})

    //--------------medication---------------
    Treatment_Record.hasMany(Medication,{foreignKey:'record_id',as:'medications'})
    Medication.belongsTo(Treatment_Record,{foreignKey:'record_id',as:'treatment'})

    //--------------report-------------------
    Physician.hasMany(Report,{foreignKey:'doc_id',as:'reports'})
    Report.belongsTo(Physician,{foreignKey:'doc_id',as:'physician'})

    //--------------treatment-------------------
    Physician.hasMany(Treatment_Record,{foreignKey:'doc_managed',as:'treatments'})
    Treatment_Record.belongsTo(Physician,{foreignKey:'doc_managed',as:'physician'})

    //--------------questionnaire-------------------
    Child.hasMany(Questionnaire,{foreignKey:'patient_id',as:'questionnaires'})
    Questionnaire.belongsTo(Child,{foreignKey:'patient_id',as:'patient'})

    console.log('setting associations has gone perfect!')
}
