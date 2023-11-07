const express = require('express')
const router = express.Router()
const {
    getAll,
    create,
    deleteRow,
    storePrediction,
    getOne
} = require('../controllers/patient')

const verifyJWTToken = require('../middlewares/verifyJWTToken')
const verifyDoctor = require('../middlewares/verifyDoctor')
router.get('/',verifyJWTToken, verifyDoctor,getAll)
router.post('/',verifyJWTToken, verifyDoctor, create)
router.post('/storePrediction',verifyJWTToken, verifyDoctor, storePrediction)
router.get('/storePrediction/:id',verifyJWTToken, verifyDoctor,getOne)
router.delete('/',verifyJWTToken,verifyDoctor, deleteRow)

module.exports = router
