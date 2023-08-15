const mongoose = require('mongoose')
const Workout = require('../models/workoutModel')

// get a single workout
const getWorkout = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such workout' })
  }
  const workout = await Workout.findById(id)
  if (!workout) {
    return res.status(404).json({ error: 'No such workout' })
  }
  res.status(200).json(workout)
}

// get all workouts
const getWorkouts = async (req, res) => {
  // eslint-disable-next-line camelcase
  const user_id = req.user._id
  // eslint-disable-next-line camelcase
  const workouts = await Workout.find({ user_id }).sort({ createdAt: -1 })

  res.status(200).json(workouts)
}

// create new workout
const createWorkout = async (req, res) => {
  const { title, reps, load } = req.body

  const emptyFields = []
  if (!title) {
    emptyFields.push('title')
  }
  if (!load) {
    emptyFields.push('load')
  }
  if (!reps) {
    emptyFields.push('reps')
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
  }

  // add doc to db
  try {
    // eslint-disable-next-line camelcase
    const user_id = req.user._id
    // eslint-disable-next-line camelcase
    const workout = await Workout.create({ title, reps, load, user_id })
    res.status(200).json(workout)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// delete a workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such workout' })
  }
  const workout = await Workout.findByIdAndDelete(id)
  if (!workout) {
    return res.status(404).json({ error: 'No such workout' })
  }

  res.status(200).json(workout)
}

// update a workout
const updateWorkout = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such workout' })
  }

  const workout = await Workout.findByIdAndUpdate(id, {
    ...req.body
  })
  if (!workout) {
    return res.status(404).json({ error: 'No such workout' })
  }

  res.status(200).json(workout)
}

module.exports = {
  createWorkout,
  getWorkout,
  getWorkouts,
  deleteWorkout,
  updateWorkout

}
