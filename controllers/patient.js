const {encryptPassword} = require('../tools/bCryptEncryptor')
const moment = require('moment')

const getAll = async (req, res, next) => {
    try {
        const dbTreatmentRecords = await Treatment_Record.findAll({
            include: ['medications','patient'],
            where:{
                doc_managed:req.dbUser.physicians[0].doc_ID
            }
        })
        res.status(200).json(dbTreatmentRecords)
    } catch (error) {
        console.log(error)
        next(new Error('Server error'))
    }
}

const create = async (req, res, next) => {
   try{
       const {
           firstname,
           lastname,
           birthDate,
           diagnosisDate,
           gender,
           medications
       } = req.body
       const newDBPatient = await Child.create({
           first_name: firstname,
           last_name: lastname,
           birth_date: moment.utc(birthDate),
           gender: gender,
           docID: req.dbUser.physicians[0].doc_ID
       })
       const newDBTreatmentRecord = await Treatment_Record.create({
           diagnosis_date: new moment(diagnosisDate),
           patient_id:newDBPatient.dataValues.patient_id,
           doc_managed: req.dbUser.physicians[0].doc_ID
       })
       //console.log(medications.med)
       if(medications){
           let willBeCreatedMedications = medications.map(med=>{
               return {
                   med_name: med.med_name,
                   start_date: new moment(med.start_date),
                   dosage_amount: med.dosage_amount,
                   record_id: newDBTreatmentRecord.record_id
               }
           })
           if(willBeCreatedMedications.length != 0){
               await Medication.bulkCreate(willBeCreatedMedications)
           }
       }
       res.sendStatus(200)
   }
   catch(error){
       console.log(error)
       next(new Error(error))
   }
}

const deleteRow = async (req, res, next) => {
    try{

        const {patient_id} = req.body
        await Parents.destroy({
            where:{
                patient_id
            }
        })
        await Child.destroy({
            where:{
                patient_id
            }
        })
        await Treatment_Record.destroy({
            where:{
                patient_id
            }
        })
   
    
        res.sendStatus(200)
    }
    catch(error){
        console.log(error)
        next(new Error(error))
    }
}

const storePrediction = async (req, res, next) => {
    try {
        const {
            patient_id,
            pred,
            pred_date,
         
        } = req.body

        const newPrediction = await Prediction.create({
            patient_ID: patient_id,
            pred: pred,
            pred_date,
        })
        res.sendStatus(200)
    } catch (error) {
        console.log(error)
        next(new Error(error))
    }
}


const getOne = async (req, res, next) => {
    try {

        const pred = await Prediction.findOne({

            where:{
                patient_ID: req.params.id,
            }
        })
        res.status(200).json(pred)
    } catch (error) {
        console.log(error)
        next(new Error('Server error'))
    }
}

module.exports = {
    getAll,
    create,
    deleteRow,
    storePrediction,
    getOne
}
