const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs')
const passport = require('passport');


//user model
const User = require('../models/User');

//residence model
const residence = require('../models/residence');

//business model
const business = require('../models/business');


//addresidence
router.get('/dashboard', (req, res) => res.render('dashboard'))





//Loginpage
router.get('/login', (req, res) => res.render('login'));

//Register page
router.get('/register', (req, res) => res.render('register'));

//Register handle
router.post('/register', (req, res) => {
    const { name, email, password ,password2 } = req.body;
    let errors = []

    //check required fields
    if(!name || !email || !password || !password2) {
        errors.push({msg:'Please fill in all fields'})
    }

    //check passwords match
    if(password !== password2) {
        errors.push({ msg:'Password do not match'});
    }
    
    //check password length
    if(password.length < 6) {
        errors.push({msg:'Password should be in 6 Characters'});
    }

    if(errors.length > 0) {
       res.render('register', {
           errors,
           name,
           email,
           password,
           password2
       });
    }else{
        //Validation passed
        User.findOne({ email: email})
        .then(user => {
            if(user){
                //user exists
                error.push({ msg: 'Email is already registered.'})
                res.render('register', {
                    errors,
                    name,
                    email,
                    password,
                    password2
                });
            } else{
                const newUser = new User({
                    name,
                    email,
                    password

                });
                
                //hashed password
                bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) throw err;
                    //set password to hash
                    newUser.password = hash
                    //save to user
                    newUser.save()
                    .then(user => {
                        req.flash('success_msg', 'You are now registered.');
                        res.redirect('/users/login');
                    })
                    .catch(err => console.log(err));
                }))
            }
        });
    }
});
    
// log in handle
router.post('/login', (req, res, next) =>{
    passport.authenticate('local', {
        successRedirect: '/dashboard', 
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);

});

//addresidence handle

router.post('/dashboard', (req, res) => {
    const { Residence_name } = req.body;
    let errors = []

    const newResidence = new residence({
        Residence_name,


     });
     //save to user
    newResidence.save()
    .then(user => {
        req.flash('success_msg', 'You are now registered.');
     })
    .catch(err => console.log(err));
    
});




//addbusiness handle
router.post('/addbusiness', (req, res) => {
    const { Business_name } = req.body;
    let errors = []

    const newBusiness = new business({
        Business_name,


     });
     //save to user
    newBusiness.save()
    .then(user => {
        req.flash('success_msg', 'You are now registered.');
     })
    .catch(err => console.log(err));
    
});





//logout handle
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are now Logged out');
    res.redirect('/users/login');
})



module.exports = router;