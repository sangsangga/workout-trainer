const express = require('express')
const router = express.Router()
const userRouter = require('./userRoutes')
const workoutRouter = require('./workoutRoutes')
const Controller = require('../controllers/controller.js')


router.get('/',Controller.getWelcome)
router.use('/users',userRouter)
router.use('/workouts',workoutRouter)

module.exports = router;