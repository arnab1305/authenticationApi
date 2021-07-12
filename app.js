const express = require('express')
const app = express()
const mongoose = require('mongoose')
const url ='mongodb://localhost/newTestDb'

//CONNECT USING MONGOOSE TO DB

mongoose.connect(url,{useNewUrlParser: true})
const con = mongoose.connection

try{
    con.on('open',()=>{
        console.log('Connected to db')
    })
}catch(err){
    console.log('Error' + err)
}

//ROUTER

const authRouter = require('./routes/auth')
const privateRouter = require('./routes/privateRoute')


//MIDDLEWARE

app.use(express.json())
app.use('/api/user', authRouter)
app.use('/api/private',privateRouter)



//LISTENER


app.listen(9000,()=>{console.log('Server is running on port 9000')})