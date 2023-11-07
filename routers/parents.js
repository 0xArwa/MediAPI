const express = require('express')
const router = express.Router()
const {
    update,
    getOne
} = require('../controllers/parents')

const verifyJWTToken = require('../middlewares/verifyJWTToken')
const verifyParents = require('../middlewares/verifyParents')
router.get('/',verifyJWTToken, verifyParents, getOne)
router.put('/',verifyJWTToken, verifyParents, update)

module.exports = router
