const express = require('express')
const router = express.Router()
const {
    update,
    getOne
} = require('../controllers/doctor')

const verifyJWTToken = require('../middlewares/verifyJWTToken')
const verifyDoctor = require('../middlewares/verifyDoctor')
router.put('/',verifyJWTToken, verifyDoctor, update)
router.get('/',verifyJWTToken, verifyDoctor, getOne)
module.exports = router
