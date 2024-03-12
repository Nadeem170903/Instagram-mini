const express = require('express');
const router =  express.Router();
const mongoose = require('mongoose');
const User = require('../models/User.js');
const passport = require('passport');
const expressError = require('../utils/expressError.js');
const {storage} = require('../cloudinaryConfig.js');
const multer  = require('multer')
const upload = multer({ storage });
const wrapA = require('../utils/wrapAsync.js');
const {userValidator,postValidator} = require('../middelware.js');



// signup routes
router.get('/signup',(req,res)=>{
    res.render('listings/signup');
});

router.post('/signup', userValidator, upload.single('profile'), wrapA(async (req, res,next) => {
    
        let { fullname, username, password, contact } = req.body;
        let filename = req.file.filename;
        let url = req.file.path;
        let newUser = new User({ fullname, username });
        newUser.profile.filename = filename;
        newUser.profile.url = url;
        let mobile_no, email;
        if (!isNaN(contact) && contact !== '') {
            mobile_no = contact;
            newUser.contact.mobile_no = mobile_no;
        } else {
            email = contact;
            newUser.contact.email = email;
        }
        let registeredUser = await User.register(newUser, password);
        console.log(registeredUser);
        req.login(registeredUser,(e)=>{
            if(e){
                return next(e);
            } res.redirect('/home');
        })
   
}));

// login routes
router.get('/login',(req,res)=>{
    res.render('listings/login.ejs');
});

router.post('/login', passport.authenticate('local', { failureRedirect: '/login' }), async (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect('/home');
    } else {
        console.log('User not authenticated');
        res.redirect('/login');
    }
});

router.post('/logout',async(req,res,next)=>{
    req.logOut((err)=>{
        if(err){next(err)}
        res.redirect('/login');
    })
})



module.exports = router