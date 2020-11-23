const express = require('express')
const postRouter = require('./routers/post')

const app = express()

const port = process.env.PORT | 3000

app.use(postRouter)


app.listen(port, ()=>{
    console.log("Listening on Port "+ port )
})


