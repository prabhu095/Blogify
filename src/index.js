const path = require('path')
const express = require('express')
const postRouter = require('./routers/post')
const userRoute = require('./routers/user')
const hbs = require('hbs')
mognConnection = require('./db/mongoose')
var bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');



mognConnection.connection;

const app = express()

const port = process.env.PORT | 3000

// Define paths for Express Config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// configure partial path
hbs.registerPartials(partialsPath)

//Setup static directory to server
app.use(express.static(publicDirectoryPath))


// Setup handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewsPath)

// for parsing application/json
app.use(bodyParser.json()); 

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true })); 
//form-urlencoded

app.use(postRouter)
app.use(userRoute)
app.use(cookieParser());


app.listen(port, ()=>{
    console.log("Listening on Port "+ port )
})


