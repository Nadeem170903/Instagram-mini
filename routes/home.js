const express = require('express');
const router =  express.Router({mergeParams:true});
const Post = require('../models/Post.js');







// home route;
router.get('/', async (req,res)=>{
    let pst = await Post.find().populate('user');
    res.render('listings/home',{pst});
});

router.get('/home', async (req,res)=>{
    let pst = await Post.find().populate('user');
    res.render('listings/home',{pst});
});


// post route
// app.post('/home/profile/:id',async(req,res)=>{
//    let {id} = req.params;
//    let {username} = req.query;
//    let currUsername = res.locals.currUser.username;
//    if(currUsername === username){
//      res.redirect('/:username');
//    }
//    console.log('this is post username',username);
//    console.log(username);
//    let post = await Post.findById(id).populate('user').populate('likes').populate('comments');
//    let user = await User.findByUsername(username);
//    console.log('this is follower length',user.follower.length);
//    console.log('this is user at 104',user)
//     res.render('listings/showUserProfile.ejs',{post , user});
// });



module.exports = router