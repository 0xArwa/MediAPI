const {encryptPassword} = require('../tools/bCryptEncryptor')

const getAll = async (req, res, next) => {
    try {
        const dbAdmins = await Admin.findAll({
            include: ['user']
        })
        res.status(200).json(dbAdmins)
    } catch (error) {
        console.log(error)
        next(new Error('Server error'))
    }
}


const getAllUsers = async (req, res, next) => {
    try {
        const dbUsers = await User_Account.findAll({
        })
        res.status(200).json(dbUsers)
    } catch (error) {
        console.log(error)
        next(new Error('Server error'))
    }
}

const create = async (req, res, next) => {
   try{
       const {firstname, lastname, username, email, password, phoneNumber} = req.body
       const user = await User_Account.findOne({
           where:{
               user_name:username
           }
       })
       if(user){
           throw 'Username already exist'
       }
       await User_Account.create({
           user_name:username,
           email,
           role:'ADMIN',
           password:await encryptPassword(password)
       })
       const newDBAdmin = await Admin.create({
           first_name: firstname,
           last_name: lastname,
           user_name: username,
           phone_number: phoneNumber
       })
       res.status(200).json(newDBAdmin)
   }
   catch(error){
       next(new Error(error))
   }
}

const update = async (req, res, next) => {
    try{
        const {
            firstname,
            lastname,
            username,
            email,
            address,
            city,
            country,
            postalCode
        } = req.body
        const {user_name:loggedUsername} = req.dbUser
        await User_Account.update({
            user_name:username,
            email
        },{
            where:{
                user_name:loggedUsername
            }
        })
        await Admin.update({
            user_name:username,
            first_name:firstname,
            last_name:lastname,
            address,country,postalCode,city
        },{
            where:{
                user_name:loggedUsername
            }
        })
        res.sendStatus(200)
    }
    catch(error){
        next(new Error(error))
    }
}

const deleteRow = async (req, res, next) => {
    
    try{
        const {username} = req.body
        await Admin.destroy({
            where:{
                user_name:username
            }
        })
        await User_Account.destroy({
            where:{
                user_name:username
            }
        })
        res.sendStatus(200)
    }
    catch(error){
        console.log(error)
        next(new Error(error))
    }
}

module.exports = {
    getAll,
    getAllUsers,
    create,
    update,
    deleteRow
}
