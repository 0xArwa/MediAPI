

const getAll = async (req, res, next) => {
    try {
        const dbReports = await Report.findAll({
            include: ['physician', 'patient']
        })
        res.status(200).json(dbReports)
    } catch (error) {
        console.log(error)
        next(new Error('Server error'))
    }
}

const getById = async (req, res, next) => {
    try {
        const dbReport = await Report.findOne({
            include: ['physician', 'patient'],
            where: {
                report_id: req.params.id
            }
        })
        res.status(200).json(dbReport)
    } catch (error) {
        console.log(error)
        next(new Error('Server error'))
    }
}

const getByPatient = async (req, res, next) => {
    try {
        const dbReport = await Report.findAll({
            include: ['physician', 'patient'],
            where: {
                patient_id: req.params.id
            }
        })
        res.status(200).json(dbReport)
    } catch (error) {
        console.log(error)
        next(new Error('Server error'))
    }
}

const create = async (req, res, next) => {
    try {
        const {
            reportContent,
            objectiveFindings,
            docNotes,
            patientId
        } = req.body
        const dbChild = await Child.findByPk(patientId)
        const newDBReport = await Report.create({
            report_content: reportContent,
            objectiveFindings,
            doc_notes: docNotes,
            patient_name: `${dbChild.dataValues.first_name} ${dbChild.dataValues.last_name}`,
            patient_id: patientId,
            doc_id: req.dbUser.physicians[0].doc_ID
        })
        res.status(200).json(newDBReport)
    } catch (error) {
        console.log(error)
        next(new Error(error))
    }
}

const deleteRow = async (req, res, next) => {
    try {
        const {report_id} = req.body
        await Report.destroy({
            where: {
                report_id
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
