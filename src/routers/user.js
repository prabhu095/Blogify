const express = require('express');
const User = require('../models/user');
const router = express.Router()

const handleErrors = (err)=>{
    let errors = {email:'', password:''}

    // incorrect email
    if(err.message === 'incorrect email'){
        errors.email = 'that email is not registered'
    }

    //incorrect password 
    if(err.message === 'incorrect password'){
        errors.password = 'that password is not registered'
    }

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
        res.status(200).json({user: user._id})
    }
    catch(err){
        console.log(err)
        const errors = handleErrors(err);
        res.status(400).json({errors})
    }

})

router.get('/login', async(req, res)=>res.render('login'))



router.post('/login', async(req, res)=>{
   const {email, password} = req.body 

   try{
        const user = await User.login(email, password)
        const token = await user.generateAuthToken()
        res.cookie('jwt',token, {httpOnly:true, maxAge: maxAge*1000})
        res.status(200).json({user: user._id})
   }
   catch(err){
    const errors = handleErrors(err);
    res.status(400).json({errors})
}
})

router.get('/logout', async(req, res)=>{
    res.cookie('jwt','', {maxAge:1})
    res.redirect('/posts')
 })


module.exports = router