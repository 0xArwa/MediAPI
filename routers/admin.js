const express = require('express')
const router = express.Router()
const {
    getAll,
    getAllUsers,
    create,
    update,
    deleteRow
} = require('../controllers/admin')

const verifyJWTToken = require('../middlewares/verifyJWTToken')
const verifyAdmin = require('../middlewares/verifyAdmin')
router.get('/',verifyJWTToken, verifyAdmin, getAll)
router.get('/users/',verifyJWTToken, verifyAdmin, getAllUsers)
router.post('/',verifyJWTToken, verifyAdmin, create)
router.put('/',verifyJWTToken, verifyAdmin, update)
router.delete('/',verifyJWTToken, verifyAdmin, deleteRow)

module.exports = router
