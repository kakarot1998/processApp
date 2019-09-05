const express = require('express');
var path = require('path');
const app = require('express')();
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, '/script')));
app.use(express.static(path.join(__dirname, '/JSONFiles')));
const server = require('http').Server(app);
const port = 3000;
var session = require('express-session');
var passport = require('passport');
var  LocalStrategy = require('passport-local').Strategy;
var multer = require('multer');
var flash = require('connect-flash');
var mongo = require('mongodb').MongoClient;
var mongoose = require('mongoose');
var jsdom = require('jsdom');
const expressLayouts = require('express-ejs-layouts');

const processEngine = require("./script/processEngine.js").Request;


var db = mongoose.connection;
//DB Conf
var db = require('./config/keys').MongoURI;
//passport req

require('./config/passport')(passport);
//db Con

mongoose.connect(db, { useNewUrlParser: true })
    .then(() => console.log('Connection reussie'))
    .catch(err => console.log('rbi r7em'))
//ejs
app.use(expressLayouts);
app.set('view engine', 'ejs');

//to get data with body.req
app.use(express.urlencoded({ extended: true }));

//session express
app.use(
    session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
  })
  );


//flash connect
app.use(flash());



//midllware d passport
app.use(passport.initialize());
app.use(passport.session());


server.listen(port, ()=>{
    console.log('connecte au port 3000');
}); 

//var globales

app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    
    next();


});
// app.get('http://localhost:3000/tasks/processEngine.js', function (req, res) {
//     res.sendFile(__dirname + '/processEngine.js');
//     res.sendFile(__dirname + '/processModule.js');


// })
// app.get('http://localhost:3000/tasks/processModule.js', function (req, res) {
//     res.sendFile(__dirname + '/processModule.js');

// })
// app.get('http://localhost:3000/processEngine.js', function (req, res) {
//     res.sendFile(__dirname + '/processEngine.js');

// })
app.get('http://localhost:3000/processEngine.js', function(req,res){
    res.sendFile(__dirname+'/processEngine.js');

})

//routes
app.use('/',require('./routes/index.js'));
app.use('/users',require('./routes/users.js'));
app.use('/tasks',require('./routes/tasks.js'));
app.use(express.static('script'));