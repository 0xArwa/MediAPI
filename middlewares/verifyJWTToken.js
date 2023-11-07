const hf = require('../helperFunctions')
const jwt = require('jsonwebtoken')

module.exports = async function verifyJWTToken (req,res,next) {
    if(!req.headers['authorization'] || req.headers['authorization'].split(' ').length !== 2){
        res.send(401)
        return
    }
    let verifyResult = await hf.verifyToken(jwt, req.headers['authorization'].split(' ')[1])
    if(verifyResult) next()
    else {res.sendStatus(401)}
}
