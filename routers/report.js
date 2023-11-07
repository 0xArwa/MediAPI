const express = require('express')
const router = express.Router()
const {
    getAll,
    getById,
    getByPatient,
    create,
    deleteRow
} = require('../controllers/report')

const verifyJWTToken = require('../middlewares/verifyJWTToken')
const verifyDoctor = require('../middlewares/verifyDoctor')
router.get('/', verifyJWTToken, getAll)
router.get('/byPatient/:id', verifyJWTToken, getByPatient)
router.get('/:id', verifyJWTToken, getById)
router.post('/', verifyJWTToken, verifyDoctor, create)
router.delete('/', verifyJWTToken, deleteRow)

module.exports = router
