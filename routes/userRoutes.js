const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controller.js')

router.get('/register',Controller.getRegister)
router.post('/register',Controller.postRegister)
router.get('/login',Controller.getLogin)
router.post('/login',Controller.postLogin)
router.get('/joinWorkout',Controller.joinWorkout)
router.get('/updateWeight/:id',Controller.getUpdateWeight)
router.post('/updateWeight/:id',Controller.postUpdateWeight)

module.exports = router