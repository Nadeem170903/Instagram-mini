const express = require('express');
const router =  express.Router({mergeParams:true});
const User = require('../models/User.js');
const wrapA = require('../utils/wrapAsync.js');
const {ensureAuthenticated} = require('../middelware.js');





// show profile
router.get('/',async(req,res)=>{
    let {username} = req.params;
    let user = await User.findByUsername(username);
    res.render('listings/showUserProfile.ejs',{user});
});


  // follower list
  router.get('/followers',async (req,res)=>{
    let {username} = req.params;
    console.log('this is username',username);
    console.log('this is follower routes');
    let users = await User.findByUsername(username).populate('follower');
    console.log(users);
    res.json({users});
 })

 // following list
 router.get('/following',async (req,res)=>{
    let {username} = req.params;
    console.log('this is username',username);
    console.log('this is follower routes');
    let users = await User.findByUsername(username).populate('following');
    console.log(users);
    res.json({users});
 });


 module.exports = router ;
