const express = require('express');
const Post = require('../models/posts');
const router = express.Router()


router.get('/', async(req, res)=>{
    const posts = await Post.find({})
    console.log(posts)
    res.render('home', {"posts": posts})
    
   
})

router.get('/help', (req, res)=>{
    res.send("This is help page")
})

router.get('/about', (req, res)=>{
    res.render('about');

})



// app.com
// app.com/help
// app.com/about


module.exports = router