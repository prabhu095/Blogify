const express = require('express');
const User = require('../models/user');
const router = express.Router()

const handleErrors = (err)=>{
    let errors = {email:'', password:''}

    if (err.code=== 11000){
        errors.email = "That Email is already taken"
    }
    if(err.message.includes('User validation failed')){
        Object.values(err.errors).forEach((properties)=>{
            errors[properties.path] = properties.message

        })
    }
    
    return errors
}

maxAge = 3*24*60*60

router.get('/signup', async(req, res)=>res.render('sign-up'))

router.post('/signup', async(req, res)=>{

    try{
        const user = new User(req.body)
        await user.save()
        const token = await user.generateAuthToken()
        res.cookie('jwt',token, {httpOnly:true, maxAge: maxAge*1000})
        res.status(201).send({ user, token })
    }
    catch(err){
        console.log(err)
        const errors = handleErrors(err);
        res.status(400).json({errors})
    }


})

module.exports = router