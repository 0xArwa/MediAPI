const hf = require('../helperFunctions')
const jwt = require('jsonwebtoken')

module.exports = async function verifyAdmin(req,res,next) {
    if(!req.headers['authorization'] || req.headers['authorization'].split(' ').length !== 2){
        res.send(401)
        return
    }
    let decodedUser = await hf.decodeToken(jwt, req.headers['authorization'].split(' ')[1])
    if(decodedUser){
        let dbUser = await User_Account.findOne({
            where:{
                user_name:decodedUser.user_name
            }
        })
        if(!dbUser || (dbUser && dbUser.dataValues.role != 'ADMIN')) res.sendStatus(401)
        else {
            req.dbUser = dbUser.dataValues
            next()
        }
    }
    else {res.sendStatus(401)}
}
