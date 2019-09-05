const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
//table user
const userModel = require('../models/userModel');
const { ensureAuthenticated } = require('../config/auth');




//login route
router.get('/home', (req, res) => res.render('home'));
router.get('/about', (req, res) => res.render('about'));
router.get('/login', (req, res) => res.render('login'));

//register route
router.get('/register', (req, res) => res.render('register'));

router.post('/register',(req, res)=>{
    const { name, email, password, password2 } = req.body;
    let errors = [];




//pas de champs vides
if (!name || !email || !password || !password2){
    errors.push({ msg : 'veuillez remplir les champs'});

}
//les mdp doivent etre similaires
if (password !== password2){
    errors.push({ msg : 'les mdp doivent etre identiques'});


}
if (errors.length>0){
    res.render('register', {
        errors,
        name,
        email,
        password,
        password2


    });
}else{
    //insertion
userModel.findOne({ email : email})
    .then( user => {
        if (user) {
            //utilisateur deja present
            errors.push({ msg : 'email deja present sur la bd'});
            res.render('register', {
                errors,
                name,
                email,
                password,
                password2

            });
        } else {
            const newUser = new userModel({
                name,
                email,
                password
            });
//chiffrement du mdp avec bcrypt
bcrypt.genSalt(10, (err,salt) => 
    bcrypt.hash(newUser.password, salt, (err,hash) => {
        if(err) throw err;
            newUser.password= hash;

            newUser.save()
                .then(user => {
                    req.flash('succes_msg','vous etes inscris maintenant');
                    res.redirect('./login');

                    })
                    .catch(err => console.log(err));
                }))               
                
                

        }
    });
        
        
}

});

//login traitement

router.post('/login', (req, res, next) => {
    passport.authenticate('local',{
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true

})(req, res, next);

});

//logout 
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
  });

 

module.exports = router;    