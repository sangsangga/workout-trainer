const {User, Workout} = require('../models/index')
const compare = require('../helpers/compareHash')

class Controller {
   static getWelcome(req,res){
      res.render('welcomePage')
   }

   static getRegister(req,res){
      res.render('register')
   }

   static postRegister(req,res){
      let user = {
         email:req.body.email,
         password:req.body.password,
         fullname:req.body.fullname,
         birthdate:req.body.birthdate,
         weigth:req.body.weigth,
         height:req.body.height,
         gender:req.body.gender
      }
      User.create(user)
         .then(success => {
            res.redirect('/workouts')
         })
         .catch(err =>{
            res.send(err)
         })
   }

   static getAllWorkouts(req,res){
      Workout.findAll()
         .then(workouts => {
            console.log(req.session);
            res.render('viewAllWorkouts',{workouts,id:req.session.userId})
         })
         .catch(err => {
            console.log(err);
            res.send(err)
         })
   }

   static joinWorkout(req,res){
      
   }

   static getLogin(req,res){
      let errors;
      if(req.query.error)
         errors = req.query.error
      res.render('login',{errors})
   }
   static postLogin(req,res){
      const logged ={
         email:req.body.email,
         password:req.body.password
      }
      User.findOne({where:{email:logged.email}})
         .then(found => {
            console.log(found.password);
            if(compare(logged.password,found.password)){
               req.session.name = found.fullname
               req.session.userId = found.id
               res.redirect('/workouts')
            }else{
               res.redirect('/users/login?error="wrong username/password"')
            }
         })
         .catch(err => {
            res.send(err.message)
         })
   }


   static getUpdateWeight(req,res){
      const id =+req.params.id
      User.findByPk()
   }
   static postUpdateWeight(req,res){
      const id = +req.params.id
      const weight = req.body.weigth
      User.update({weigth:weight},{
         where:{
            id:id
         }
      })
      .then(res => {
         res.redirect('/workouts')
      })
      .catch(err => {
         console.log(err);
         res.send(err)
      })
   }
}

module.exports = Controller