require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const helmet = require('helmet')
const router = require('./src/routes/profile.route')
const { notFound, errorHandler } = require('./src/middlewares/error.middleware')

//Built-in Middleware for getting data passed in the body
app.use(express.json())


//Built-in Middleware for getting data passed in form format
app.use(express.urlencoded({extended: true}))

app.use(cors())
app.use(morgan("dev"))
app.use(helmet())

//Router-level middleware for all the routing in the API
app.use(router)

//Middleware handling the notFound page 
app.all('*', notFound)

//Error Handling middleware
app.use(errorHandler)


module.exports = app