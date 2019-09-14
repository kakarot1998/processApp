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
router.get('/test', (req, res) => res.render('test'));
router.get('/start', (req, res) => res.render('startProcess'));
router.get('/doAction', (req, res) => res.render('doAction'));
router.post('/viewJSON',(req,res)=>{


})



router.use(express.static('script'));
module.exports = router;    
