const router = require('express').Router();
const { schema, findOne } = require('../model/user');
const User = require('../model/user')
const {registerValidator} = require('../validator')
const bcrypt = require('bcryptjs')
const {loginValidator} = require('../validator')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config()


//POST
router.post('/register',async(req,res)=>{

    //Validator
    
    const {error} = registerValidator(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    //Check existing Email

    const emailExists = await User.findOne({email: req.body.email})
    if(emailExists) return res.status(400).send('Email exists')

    //Hash Password
    
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(req.body.password , salt)

    const user = new User({
        name : req.body.name,
        email: req.body.email,
        password :hashPassword
    })
    

    try{
       
        const a1 = await user.save()
        res.send(a1)
    }catch(err){
        res.send(err)
    }
})

//GET
router.get('/',async(req,res)=>{
    try{
        const users = await User.find()
        res.json(users)
    }catch(err){
        res.send(err)
    }
})

//LOGIN

router.post('/login',async(req,res)=>{

    //Validator
    
    const {error} = loginValidator(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    //Check existing Email

    const emailExists = await User.findOne({email: req.body.email})
    if(!emailExists) return res.status(400).send('Not registered')
    //Password check
    const validPass = await bcrypt.compare(req.body.password, emailExists.password)
    if(!validPass) return res.status(400).send('Enter Valid Password')

    //Create and assign a token
    const token = jwt.sign({_id: emailExists._id}, process.env.TOKEN_SECRET)
    res.header('auth-token',token).send(token)

    res.send(`Welcome ${emailExists.name}`)
    
})  


module.exports = router