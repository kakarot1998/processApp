const express = require('express');
var path = require('path');
const app = require('express')();
var cors = require('cors');   
app.use(cors()); //Enable CORS
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, '/script')));
app.use(express.static(path.join(__dirname, '/JSONFiles')));
const server = require('http').Server(app);
const io = require('socket.io').listen(server); 
const port = 3000;
var session = require('express-session');
var passport = require('passport');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const config = require('./webpack.config.js');
const compiler = webpack(config);
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

//app.use(webpackDevMiddleware(compiler, {
  //  publicPath: config.output.publicPath
 // }));

  app.set('views', path.join(__dirname, 'dist'));


//db Con

mongoose.connect(db, { useNewUrlParser: true })
    .then(() => console.log('Connection reussie'))
    .catch(err => console.log('rbi r7em'))

 
//ejs
app.use(expressLayouts);
app.set('view engine', 'ejs');

//to get data with body.req
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
io.sockets.on('connection',function(socket){
    console.log('nouvelle connection');
    socket.on('json update',function(data, callback){
        console.log("Processus demarre");
        var processEngine = require('./script/processEngine.js');
        processEngine.startProcess("welcome",1);
    });
    socket.on('do action',function(data, callback){
        console.log("Etape executee");
        var processEngine = require('./script/processEngine.js');
        processEngine.doAction(1,"brouillonPret","Stevie Ray","documentApprouve");
    });
    io.sockets.on('connection',function(socket){
        console.log('mr7ba');
        socket.on('json update',function(data, callback){
            console.log("Processus demarre");
        });
        socket.on('do action',function(data, callback){
            console.log("Etape executee");
        });
    });
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
app.get('/tasks/viewJSON',function(req,res){
    res.sendFile(__dirname + '/JSONFiles/processData.json');


})
app.post('/tasks/start',(req, res)=>{
    const processEngine = require("./script/processEngine.js"); 
    console.log("post done");
    
    console.log(req.body);
    processEngine.startProcess(req.body.coll,1,req.body.condition,req.body.result);
    res.render('myPersTasks');
    
});
app.post('/tasks/doAction',(req, res)=>{
    var definition = require('./JSONFiles/processDefinition.json');
    const processEngine = require("./script/processEngine.js"); 
    console.log("post done");
    processEngine.doAction(1,req.body.currentS,req.body.coll,req.body.etape,req.body.condition,req.body.result);
    console.log(req.body);
    res.render('myPersTasks');
    
});

//routes
app.use('/',require('./routes/index.js'));
app.use('/users',require('./routes/users.js'));
app.use('/tasks',require('./routes/tasks.js'));
app.use(express.static('script'));