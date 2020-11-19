const {User,Workout} = require('../models/index');


class Controller {
   static getWelcome(req,res){
      res.render('welcomePage')
   }
}

module.exports = Controller