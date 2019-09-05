const express = require('express');
const router = express.Router();
const passport = require('passport');
var path = require('path');
const { ensureAuthenticated } = require('../config/auth');
const processEngine = require("../script/processEngine.js").Request;
router.get('/myTasks', (req, res) => res.render('mytasks'));
router.get('/History', (req, res) => res.render('myPersTasks'));
router.post('/myPersTasks',(req,res)=>{


})
router.use(express.static('script'));
module.exports = router;    
