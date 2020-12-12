const express = require('express');
const Post = require('../models/post');
const User = require('../models/user');
const router = express.Router()
const hbs = require('hbs')
const { handlebars } = require('hbs');
const auth = require('../middleware/auth')


// Get Posts
router.get('/posts',async(req, res)=>{
    const posts = await Post.find({})
    handlebars.registerHelper('getSensorValue', function() {
        return posts;
      });

    res.render('posts', {"posts": posts}) 
   
})

// Get Post
router.get('/posts/:id', async(req, res)=>{
    const post = await Post.findById(req.params.id)
    res.render('post', {"post": post})

   
})


// Create Post
router.get('/post-create', async (req, res)=> res.render('post-create'))

// Create A Post
router.post('/post-create', async(req, res)=>{
    const createPost = new Post({ 
        title: req.body.title,
        body: req.body.body
    })
    await createPost.save()
    res.redirect('posts')
})


router.get('/post-update/:id', async(req, res)=>{
    const updatePost = await Post.findById(req.params.id)
    res.render('post-update',{
        "post": updatePost 
    })

})

router.post('/post-update/:id', async(req, res)=>{
    try{
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
        if (! post){
            res.status(400).send()
        }
        res.redirect('/posts')
    }
    catch(e){
        res.status(400).send(e)
    }

})

router.get('/post-delete/:id', async(req, res)=>{

    try{
        const post = await Post.findByIdAndDelete(req.params.id)
        if (! post){
            res.status(400).send()
        }
        res.redirect('/posts')
    }
    catch(e){
        res.status(400).send(e)
    }

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

handlebars.registerHelper('substr', function(length, context, options) {
    if ( context.length > length ) {
     return context.substring(0, length) + "...";
    } else {
     return context;
    }
});


module.exports = router