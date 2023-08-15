require('dotenv').config()
const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')
const userRotes = require('./routes/user')

// express app
const app = express()

const origin = process.env.ORIGIN
app.use(
  cors({
    credentials: true,
    origin
  })
)

// middleware
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use('/api/workouts', workoutRoutes)
app.use('/api/user', userRotes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log('connected to db & listeneing on port', process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })
