const jwt = require('jsonwebtoken')
const User = require('../models/user')


const auth = async (req, res, next) =>{
    console.log("Inside Line number 6")
    console.log(req.header('Authorizationx'))
    console.log(req.header['x-access-token'])
    console.log(req.token)
    try{
        console.log(8)
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findOne({_id: decoded._id, 'tokens.token': token})

        if (! user){
            throw new Error()
        }
        req.token = token
        req.user = user
    }
    catch (e){
        console.log(e)
    }
}

module.exports = auth