const express = require('express');
const router =  express.Router({mergeParams:true});
const User = require('../models/User.js');
const wrapA = require('../utils/wrapAsync.js');



router.post('/:id',wrapA(async(req,res)=>{
    let{id} = req.params;
    let {postUserId} = req.body;
    let followerUser = await User.findById(postUserId).populate('follower');
    let followingUser = await User.findById(id);
    let hasFollowed = followerUser.follower.some(follower => follower._id.equals(id));
     if(hasFollowed){
      let follow = await User.findByIdAndUpdate(postUserId,{$pull:{follower:id}},{new:true});
      let following = await User.findByIdAndUpdate(id,{$pull:{following:postUserId}},{new:true}); 
       res.json({follow,following})   
     }else{
       console.log('user already followed');
     }
 }));



 module.exports = router;