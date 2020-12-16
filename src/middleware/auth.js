const jwt = require('jsonwebtoken')
const User = require('../models/user')


const auth = async (req, res, next) =>{
    const token = req.headers.cookie.substring(4);
    
    try{
        jwt.verify(token, "Blogify", (err, decodedToken)=>{
            if(err){
                console.log(err)
            }
            else{
                console.log(decodedToken)
                next();
            }
        })
        
    }
    catch (e){
        console.log(e)
    }
}

const checkUser = (req, res, next) =>{
    const token = req.headers.cookie.substring(4);
    try{
        jwt.verify(token, "Blogify", async(err, decodedToken)=>{
            if(err){
                console.log(err)
            }
            else{
                console.log(decodedToken._id)
                let user =  await User.findById(decodedToken._id)
                res.locals.user = user
                next();
            }
        })
        
    }
    catch (e){
        console.log(e)
    }
}



module.exports = 
{ auth,
  checkUser}  
