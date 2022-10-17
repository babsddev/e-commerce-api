require('dotenv').config()
// const dotenv = require('dotenv')
// dotenv.config()

const express = require('express')
const mongoose = require('mongoose')
const userRoute = require('./routes/user')
const authRoute = require('./routes/auth')
const productRoute = require('./routes/product')
const cartRoute = require('./routes/cart')
const orderRoute = require('./routes/order')
const stripeRoute = require('./routes/stripe')
const cors = require('cors')

// Express App
const app = express()

// Middleware
app.use(express.json())

app.use(cors())
//Routes
app.use('/api/auth', authRoute)
app.use('/api/users', userRoute)
app.use('/api/products', productRoute)
app.use('/api/carts', cartRoute)
app.use('/api/orders', orderRoute)
app.use('/api/checkout', stripeRoute)

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
