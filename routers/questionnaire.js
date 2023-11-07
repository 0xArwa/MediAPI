const express = require('express')
const router = express.Router()
const {
    getAll,
    getById,
    getByPatient,
    create,
    deleteRow
} = require('../controllers/questionnaire')

const verifyJWTToken = require('../middlewares/verifyJWTToken')
router.get('/', verifyJWTToken, getAll)
router.get('/byPatient/:id', verifyJWTToken, getByPatient)
router.get('/:id', verifyJWTToken, getById)
router.post('/', verifyJWTToken, create)
router.delete('/', verifyJWTToken, deleteRow)

module.exports = router
