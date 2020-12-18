const mongoose = require('mongoose');
const {isEmail} = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')



const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: [true,"Please Enter an Email"],
        trim: true,
        lowercase: true,
        validate: [isEmail, 'Please Enter a valid email']
  
    },
    password:{
        type: String,
        minlength:[7,"Minimum Password length is 7 characters"],
        trim: true,
        required: true
    },
    age:{
        type: Number,
        trim: true
    },
    tokens:[{
        token:{
            type: String,
            required: true
        }
    
    }]

})
userSchema.virtual('tasks', {
    ref:'Post',
    localField:'_id',
    foreignField: 'owner'
    
})


userSchema.statics.login = async function(email, password){
    const user = await this.findOne({email})
    if (user){
        const auth = await bcrypt.compare(password, user.password)
        if (auth){
            return user
        }
        throw Error('incorrect password')
    }
    throw Error('incorrect email')
}

userSchema.methods.generateAuthToken = async function(){
    const user = this
    const token = jwt.sign({ _id:user._id.toString()}, "Blogify")
    user.tokens = user.tokens.concat({token})
    await user.save()

    return token

}




userSchema.pre('save', async function(next){
    const user = this
    if (user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }
})

const User = mongoose.model('User', userSchema)






module.exports = User