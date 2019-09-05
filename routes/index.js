const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const processEngine = require("../script/processEngine.js");
router.get('/', (req, res) => res.render('index'));
router.get('/dashboard', ensureAuthenticated , (req, res) => 
res.render('dashboard',{
    name : req.user.name

}));
router.post('/dashboard',(req, res)=>{
    processEngine.getTasks(1);
});

module.exports = router;    