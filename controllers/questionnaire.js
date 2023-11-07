

const getAll = async (req, res, next) => {
    try {
        const dbQuestionnaires = await Questionnaire.findAll({
            include: ['patient']
        })
        res.status(200).json(dbQuestionnaires)
    } catch (error) {
        console.log(error)
        next(new Error('Server error'))
    }
}

const getById = async (req, res, next) => {
    try {
        const dbQuestionnaire = await Questionnaire.findOne({
            include: ['patient'],
            where: {
                id: req.params.id
            }
        })
        res.status(200).json(dbQuestionnaire)
    } catch (error) {
        console.log(error)
        next(new Error('Server error'))
    }
}

const getByPatient = async (req, res, next) => {
    try {
        const dbQuestionnaires = await Questionnaire.findAll({
            include: ['patient'],
            where: {
                patient_id: req.params.id
            }
        })
        res.status(200).json(dbQuestionnaires)
    } catch (error) {
        console.log(error)
        next(new Error('Server error'))
    }
}

const create = async (req, res, next) => {
    try {
        const {
            patientId,
            fullname,
            gender,
            age,
            q1,
            q2,
            q3,
            q4,
            q5,
            q6,
            q7,
            q8,
            q9,
            q10,
            q11,
            q12,
            q13,
            q14,
            q15,
            q16,
            q17,
            q18,
            q19,
        } = req.body
        const newDBReport = await Questionnaire.create({
            patient_id: patientId,
            full_name: fullname,
            gender,
            age,
            q1,
            q2,
            q3,
            q4,
            q5,
            q6,
            q7,
            q8,
            q9,
            q10,
            q11,
            q12,
            q13,
            q14,
            q15,
            q16,
            q17,
            q18,
            q19
        })
        res.status(200).json(newDBReport)
    } catch (error) {
        console.log(error)
        next(new Error(error))
    }
}

const deleteRow = async (req, res, next) => {
    try {
        const {id} = req.body
        await Questionnaire.destroy({
            where: {
                id
            }
        })
        res.sendStatus(200)
    } catch (error) {
        console.log(error)
        next(new Error(error))
    }
}

module.exports = {
    getAll,
    getById,
    getByPatient,
    create,
    deleteRow
}
