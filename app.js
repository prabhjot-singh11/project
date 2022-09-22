const express = require('express')
var path = require('path');
const mongoose= require('mongoose');
passport = require("passport");
bodyParser = require("body-parser");
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bcrypt = require('bcrypt');
const app = express()
const port = 4000


app.use(express.json())
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


const loginRouter = require('./routes/login');
const adminRouter = require('./routes/admin');
const userRouter = require('./routes/user')

const url="mongodb://localhost:27017/Willproject"

mongoose.connect(url,{useNewUrlParser:true,   
})


const con = mongoose.connection
con.on('error',console.error.bind(console,"connection EROOR"))
con.once("open", function () {
console.log("Connected successfully to database");
});



app.use('/',loginRouter)
app.use('/admin',adminRouter)
app.use('/user',userRouter)






app.get('/index', (req, res) => {
  res.render('index')
})
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})