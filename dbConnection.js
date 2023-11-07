const Sequelize = require('sequelize')
//defining the database tables
const models = [
    'Admin',
    'Child',
    'Medication',
    'Parents',
    'Parents_Info',
    'Physician',
    'Prediction',
    'Report',
    'Treatment_Record',
    'User_Account',
    'Verification',
    'Questionnaire'
]

//connecting to the database
module.exports = {
    sequelizer: new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USERNAME,
        process.env.DB_PASSWORD, {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        define: {
            timestamps: false
        },
        pool: {
            max: 25,
            min: 0,
            idle: 10000
        },
    }),
    //storing path names of the models
    initModel: () => {
        models.forEach(m=>{
            let mObject = require(`./models/${m.toLowerCase()}.js`)(global.db)
            global[m] = mObject
        })
    }
}
