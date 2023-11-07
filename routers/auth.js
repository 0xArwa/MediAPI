const express = require('express')
const router = express.Router()
const {
    signUpDoc,
    signUpParent,
    verifyPatientInfo,
    signIn,
    sendVerificationCode,
    forgotMyPassword,
    verifyVerificationCodeForPasswordReset,
    resetMyPassword,
    logout,
    checkUserandEmail
} = require('../controllers/auth')

router.post('/checkUser',checkUserandEmail)
router.post('/sendOTP',sendVerificationCode)
router.post('/signupDoc',signUpDoc)
router.post('/signupParent',signUpParent)
router.post('/verifyPatientInfo', verifyPatientInfo)
router.post('/signin',signIn)
router.post('/forgotMyPassword',forgotMyPassword)
router.post('/verifyVerificationCodeForPasswordReset',verifyVerificationCodeForPasswordReset)
router.post('/resetMyPassword',resetMyPassword)
router.post('/logout',logout)
module.exports = router
