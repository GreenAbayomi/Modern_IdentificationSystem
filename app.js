require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const router = require('./src/routes/profile.route')
const { not } = require('joi')
const { notFound, errorHandler } = require('./src/middlewares/error.middleware')

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(cors())
app.use(morgan("dev"))

app.use(router)


app.all('*', notFound)
app.use(errorHandler)


module.exports = app