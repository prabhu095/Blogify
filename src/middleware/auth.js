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

module.exports = auth