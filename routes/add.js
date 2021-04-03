const express = require('express')
const router = express.Router();


//residence model
const residence = require('../models/residence');

//addresidence
router.get('/dashboard', (req, res) => res.render('dashboard'))

//addresidence handle

router.post('/dashboard', (req, res) => {
    const { Rname} = req.body;
    let errors = []

    const newResidence = new residence({
        Rname,
        Rcurrentaddress,
        Rpermanentaddress

     });
     //save to user
    newResidence.save()
    .then(user => {
        req.flash('success_msg', 'You are now registered.');
        res.redirect('/users/login');
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