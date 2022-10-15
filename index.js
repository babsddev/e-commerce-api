require('dotenv').config()
// const dotenv = require('dotenv')
// dotenv.config()

const express = require('express')
const mongoose = require('mongoose')
const userRoute = require('./routes/user')
const authRoute = require('./routes/auth')

// Express App
const app = express()

// Middleware
app.use(express.json())

//Routes
app.use('/api/auth', authRoute)
app.use('/api/users', userRoute)

// Connect to DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // Listening for requests
    app.listen(process.env.PORT, () => {
      console.log('Connected to db & listening on port', process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })
