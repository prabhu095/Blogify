const express = require('express');
const router = express.Router()

router.get('/', (req, res)=>{
    res.send("This is my home page")
})

router.get('/help', (req, res)=>{
    res.send("This is help page")
})

router.get('/about', (req, res)=>{
    res.send("This is about page")
})



// app.com
// app.com/help
// app.com/about


module.exports = router