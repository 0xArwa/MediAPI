const jwt = require('jsonwebtoken')
const bCrypt = require('bcrypt')
const {sendOTP} = require('../tools/sendMail')
const jwtSecret = process.env.JWT_SECRET
const {encryptPassword} = require('../tools/bCryptEncryptor')
const newUser = async (req) => {
    try {
        const {email, username, password, role} = req.body
            let previousUser = await User_Account.findOne({
                where: {
                    user_name:username
                }
            })
            if (previousUser) {
                throw new Error('Username already exist')
            }
        let encryptedPassword = await encryptPassword(password)
        return await User_Account.create({
            email, role,
            user_name: username,
            password: encryptedPassword
        })
    } catch (error) {
        throw error
    }
}

const newPhysician = async (req) => {
    try {
        const {firstname, lastname, username} = req.body
        await Physician.create({
            first_name: firstname,
            last_name: lastname,
            username_: username
        })
        return username
    } catch (error) {
        console.log(error)
        throw error
    }
}

const newParents = async (req) => {
    try {
        const {
            firstname,
            lastname,
            address,
            country,
            city,
            postalCode,
            username,
            patient_id
        } = req.body
        await Parents.create({
            city:city?city:'No Value',
            address:address?address:'No Value',
            country:country?country:'No Value',
            postalCode:postalCode?postalCode:'No Value',
            first_name:firstname,
            last_name:lastname,
            user_name:username,
            patient_id
        })
        return username
    } catch (error) {
        console.log(error)
        throw error
    }
}

const signUpDoc = async (req, res, next) => {
    try {
        const {role, code, email} = req.body
        //console.log(req.body);
        const dbVerification = await Verification.findOne({
            where: {
                email,
                code: code
            },
            order: [['id', 'desc']]
        })
        if (!dbVerification) {
            next(new Error('OTP is invalid!'))
            return
        }
        let user = null
        if (role == process.env.ROLE_PHYSICIAN) {
            user = await newUser(req)
            await newPhysician(req)
        }
        res.json(user)
    } catch (error) {
        console.log(error)
        next(error)
    }
}


const signUpParent = async (req, res, next) => {
    try {
        const {code, email } = req.body
        const dbVerification = await Verification.findOne({
            where: {
                email,
                code: code
            },
            order: [['id', 'desc']]
        })
        if (!dbVerification) {
            next(new Error('OTP is invalid!'))
            return
        }
            res.json(200);
    } catch (error) {
        console.log(error)
        next(error)
    }
}

const verifyPatientInfo = async (req, res, next) =>{
    try{
        const {role} = req.body
        let user = null
        if (role == process.env.ROLE_PARENT) {
            let dbChild = await Child.findOne({
                where: {
                    patient_id: req.body.patient_id,
                    birth_date: req.body.bd
                }
            })
            if (!dbChild) {
                throw new Error('Invalid Patient info!')
            }
            user = await newUser(req)
            await newParents(req)
        }
        res.json(user)
    }catch(error){
        console.log(error)
        next(error)
    }
}
const signIn = async (req, res, next) => {
    try {
        const {username, password} = req.body
        let user = await User_Account.findOne({
            where: {
                user_name:username
            }
        })
        if (!user || !bCrypt.compareSync(password, user.dataValues.password)) {
            throw new Error('Invalid Credentials!')
        }
        let jwtSign = jwt.sign(user.dataValues, process.env.JWT_SECRET)
        const {role} = user.dataValues
        user = await User_Account.findOne({
            where: {
                user_name:username
            },
            include: [role == process.env.ROLE_PHYSICIAN ? 'physicians' : (role == process.env.ROLE_PARENT ? 'parents' : 'admins')]
        })
        res.json({user: user, token: jwtSign})
    } catch
        (error) {
        console.log(error)
        next(error)
    }
}

const checkUserandEmail = async (req, res) => {
    try{
        const {email, username} = req.body
        let previousUser = await User_Account.findOne({
            where: {
                user_name:username
            }
        })
        if (previousUser) {
            throw new Error('Username already exist')
        }
        let previousEmail = await User_Account.findOne({
            where: {
                email:email
            }
        })
        if (previousEmail) {
            throw new Error('Email already exist')
        }
        res.sendStatus(200)
    }catch(error) {
        console.log(error)
        res.send({message: `${error.message}`});
    }
}

const sendVerificationCode = async (req, res) => {
    try {
        const {email} = req.body
        const OTP = await sendOTP(email)
        await Verification.create({
            email,
            code: OTP,
            createdAt: Date()
        })
        res.sendStatus(200)
    } catch (error) {
        res.sendStatus(500)
    }
}

const forgotMyPassword = async (req, res, next) => {
    try {
        const {email,username} = req.body
        const user = await User_Account.findOne({
            where:{
                user_name:username,
                email
            }
        })
        if(!user){
            throw new Error('No Account exists with these information')
        }
        const OTP = await sendOTP(email)
        await Verification.create({
            email,
            code: OTP,
            createdAt: Date()
        })
        res.sendStatus(200)
    } catch (error) {
        next(error)
    }
}

const verifyVerificationCodeForPasswordReset = async (req, res, next) => {
    try {
        const {email,code} = req.body
        const dbVerification = await Verification.findOne({
            where: {
                email,
                code: code
            },
            order: [['id', 'desc']]
        })
        if (!dbVerification) {
            next(new Error('OTP is invalid!'))
            return
        }
        res.sendStatus(200)
    } catch (error) {
        next(error)
    }
}

const resetMyPassword = async (req, res, next) => {
    try{
        const {username,email,password,code} = req.body
        const dbVerification = await Verification.findOne({
            where: {
                email,
                code: code
            },
            order: [['id', 'desc']]
        })
        if (!dbVerification) {
            next(new Error('OTP is invalid!'))
            return
        }
        const user = await User_Account.findOne({
            where:{
                user_name:username,
                email
            }
        })
        if(!user){
            throw new Error('Invalid Username or Email Information')
        }
        await User_Account.update({
            password:await encryptPassword(password)
            
        },{
            where:{
                user_name:username,
                email
            }
        })
     
        res.sendStatus(200)
    }
    catch(error){
        next(error)
    }
}

 const logout = (req, res) =>{
    res.clearCookie("access_token", {
        sameSite: "none",
        secure: true
    }).status(200).json("user has been logged out")
};

module.exports = {
    sendVerificationCode,
    signUpDoc,
    signUpParent,
    verifyPatientInfo,
    signIn,
    forgotMyPassword,
    verifyVerificationCodeForPasswordReset,
    resetMyPassword,
    logout,
    checkUserandEmail
}
