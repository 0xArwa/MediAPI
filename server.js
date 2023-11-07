require('dotenv').config()
const express = require('express')
const cors = require('cors')()
const db = require('./dbConnection')
const bodyParser = require('body-parser')
const associations = require('./associations')
const request = require('request');
const server = express()

const http = require('http').createServer(server)
server.use(cors)
const PORT = process.env.PORT

server.use(bodyParser.urlencoded({extended: true}))
server.use(bodyParser.json())

db.sequelizer.authenticate()
    .then(() => {
        console.log('connected to database')
        global.db = db.sequelizer
        db.initModel()
        associations()
    })
    .catch((error) => console.log(`error ${error}`))

//--------------------------routes-----------------------
server.use('/auth',require('./routers/auth'))
server.use('/admin',require('./routers/admin'))
server.use('/patient',require('./routers/patient'))
server.use('/doctor',require('./routers/doctor'))
server.use('/parents',require('./routers/parents'))
server.use('/report',require('./routers/report'))
server.use('/questionnaire',require('./routers/questionnaire'))

server.get('/' , (req,res)=>{
    res.json("it works!")
})

server.use( (error,req,res,next) => {
    res.status(500).json({msg:error.message})
})

http.listen(PORT, console.log(`server is now listening on port ${PORT}`))

// local server
server.use('/ML', (req, res)=> {
    request('http://127.0.0.1:3002/flask', function (error, response, body) {
        res.send(req.body);
        res.send(body); 
      });      
});

server.get('/ML', (req, res)=> {
    request('http://127.0.0.1:3002/flask', function (error, response, body) {
        console.error('error:', error); 
        console.log('statusCode:', response && response.statusCode); 
        console.log('body:', body); 
        res.send(body); 
      });      
});

server.post('/ML', (req, res)=> {
    request('http://127.0.0.1:3002/flask', function (error, response, body) {
        res.send(req.body);
        res.send(body); 
      });      
});