const express = require('express');
const app = express();
const PORT = 3000
const router = require('./routes/index.js')
const session = require('express-session')

app.set('view engine','ejs')
app.use(express.urlencoded({extended:true}))
app.use(session({
   secret:"session workout",
   resave:false,
   saveUninitialized:true
}))
app.use('/',router)


app.listen(PORT,() => {
   console.log(`Listening on http://localhost:3000`);
})