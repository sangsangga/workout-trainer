const express = require('express');
const router = express.Router();
const Controller = require('../controllers/controller.js');

function userAuthentication(req,res,next){
   if(req.session.name){
      next();
   }else{
      res.redirect('/users/login?error=you must login first')
   }
}

router.get('/seeUsers/:id',Controller.getWorkoutPage)
router.use(userAuthentication)
router.get('/',Controller.getAllWorkouts)

module.exports = router