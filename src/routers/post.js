const express = require('express');
const Post = require('../models/posts');
const router = express.Router()
const hbs = require('hbs')
const { handlebars } = require('hbs');



router.get('/posts', async(req, res)=>{
    const posts = await Post.find({})
    handlebars.registerHelper('getSensorValue', function() {
        return posts;
      });

    res.render('posts', {"posts": posts}) 
   
})

router.get('/posts/:id', async(req, res)=>{
    const post = await Post.findById(req.params.id)
    res.render('post', {"post": post})
    
   
})

router.get('/contact', (req, res)=>{
    res.render("contact")
})

router.post('/post-contact', (req, res)=>{
    console.log(req.body)
    res.send("Message Received Successfully")
})

router.get('/about', (req, res)=>{
    res.render('about');

})



// app.com
// app.com/help
// app.com/about


module.exports = router