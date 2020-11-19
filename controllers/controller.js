const {User, Workout, UserWorkout} = require('../models/index')
const compare = require('../helpers/compareHash')
const nodemailer = require("nodemailer")
const emailConfig = require('../ignore/emailConfig.json')

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
      const userId = req.session.userId
      const workoutId = req.params.id
      const insertData = {
         UserId:userId,
         WorkoutId:workoutId,
         completeTime:0
      }
      let dataClass;

      Workout.findByPk(workoutId)
         .then(data => {
            dataClass = data;
            return UserWorkout.create(insertData)
         })
         .then(success => {
            res.redirect(`/users/myWorkouts/${userId}`)
            return nodemailer.createTransport({
               host:"smtp.gmail.com",
               port:465,
               secure:true, 
               auth: {
                  user: emailConfig.user, 
                  pass: emailConfig.pass, 
               },
            })
         })
         .then(transporter => {
            transporter.sendMail({
               from:'"blackbeardvsluffy@gmail.com"',
               to:'wandaputrasangga@gmail.com',
               subject:"Congratulation",
               text:`You have join workout ${dataClass.name}`
            });
         })
         .catch(err => {
            res.send(err)
         })
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
      User.findByPk(id)
         .then(user => {
            res.render('updateWeight',{user,id:req.session.userId})
         })
         .catch(err => {
            console.log(err);
            res.send(err);
         })
   }
   static postUpdateWeight(req,res){
      const id = +req.params.id
      const weight = req.body.weigth
      console.log(id);
      User.update({weigth:weight},{
         where:{
            id:id
         }
      })
      .then(success => {
         res.redirect('/workouts')
      })
      .catch(err => {
         console.log(err);
         res.send(err)
      })
   }

   static deleteAccount(req,res){
      const id = +req.params.id;
      User.destroy({where:{id:id}})
         .then(success => {
            res.redirect('/workouts')
         })
         .catch(err => {
            console.log(err);
            res.send(err);
         })
   }

   static getMyWorkouts(req,res){
      const id = +req.params.id
      User.findByPk(id,{
         include:Workout
      })
         .then(user => {
            res.render('myWorkout',{user})
         })
         .catch(err => {
            console.log(err);
            res.send(err.message);
         })
   }

   static getWorkoutPage(req,res){
      const id = +req.params.id
      Workout.findByPk(id,{
         include:{
            model:User,
            required:false
         }
      })
      .then(workout =>{
         res.render('workoutPage',{workout})
      })
      .catch(err => {
         console.log(err);
         res.send(err.message)
      })

   }
}

module.exports = Controller