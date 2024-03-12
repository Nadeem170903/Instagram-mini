const express = require('express');
const router =  express.Router({mergeParams:true});
const Post = require('../models/Post.js');
const User = require('../models/User.js');
const Like = require('../models/Like.js');
const expressError = require('../utils/expressError.js');






// unlike route
router.post('/:id',async (req,res)=>{
    try{
      let {id} = req.params;
      let userId = res.locals.currUser._id;
      console.log('thid is userId',userId);
      let likeId = await Like.findOne({user:userId,post:id});
      console.log("this is likeId ",likeId._id);
  
      let updatePost = await Post.findByIdAndUpdate(id,{$pull:{likes:likeId._id}},{new:true});
      let userUpdate = await User.findByIdAndUpdate(userId,{$pull:{likedPost:id}},{new:true});
      console.log(updatePost);
      console.log('this is userUpdates',userUpdate);
      console.log('this is postUpdate',updatePost);
  
      let del = await Like.findOneAndDelete({user:userId,post: id});
      console.log("this is delt like",del);
      res.json(updatePost);
     
    }catch(error){
        new expressError(404,error);
    }
  });

  module.exports = router;