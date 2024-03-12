const express = require('express');
const router =  express.Router({mergeParams:true});
const User = require('../models/User.js');
const wrapA = require('../utils/wrapAsync.js');






router.post('/followed/:id',wrapA(async(req,res)=>{
    let currUser = res.locals.currUser;
    await currUser.populate('follower');
    let{id} = req.params;
    let {postUserId} = req.body;
    let followerUser = await User.findById(postUserId).populate('follower');
    let followingUser = await User.findById(postUserId).populate('following');
    let hasFollowing = followerUser.following.some(following => following._id.equals(id));
    let hasFollowed = followerUser.follower.some(follower => follower._id.equals(id));
    res.json({hasFollowed,hasFollowing,currUser});
}));



router.post('/:id',async(req,res)=>{
     let{id} = req.params;
     let {postUserId} = req.body;
     console.log('this is currr user Id',id);
     console.log('this is post user Id',postUserId);
     let followerUser = await User.findById(postUserId).populate('follower');
     let followingUser = await User.findById(id);
     let hasFollowed = followerUser.follower.some(follower => follower._id.equals(id));
      if(!hasFollowed){
        let follow = await User.findByIdAndUpdate(postUserId,{$push:{follower:id}},{new:true});
        let following = await User.findByIdAndUpdate(id,{$push:{following:postUserId}},{new:true});
        console.log('total follower ',followerUser.follower.length);
         res.json({follow,following});    
      }else{
        console.log('user already followed');
      }

 });

 module.exports = router;