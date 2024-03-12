const express = require('express');
const router =  express.Router({mergeParams:true});
const User = require('../models/User.js');
const Post = require('../models/Post.js');
const Like = require('../models/Like.js')





// liked route
router.post('/',async(req,res)=>{

    try{
     let {userId} = req.body;
     let likedUser = await User.findById(userId).populate('likedPost');
      res.json({likedUser});
    } catch(e){
        console.log("this  is error",e);
    }
 });



 // like route
router.post('/:id',async (req,res)=>{
    try{
        let {id} = req.params;
        let userId = res.locals.currUser.id;
        let likeCount = 1;
        let post = await Post.findById(id).populate('likes');
        console.log("thsi is userId",userId);
         let likePost = post.likes.some(like => like.user.equals(userId));
         if(!likePost){
            let like = new Like({user:userId,post:id,likeCount});
            await like.save();
            let likedUser = await User.findByIdAndUpdate(userId,{$push:{likedPost:id}},{new:true});
            let updatedPost = await Post.findByIdAndUpdate(id,{$push:{likes:like._id}},{new:true})
            const populatedPost = await Post.populate(updatedPost, {
                path: 'likes',
                populate: { path: 'user' }
            });
            res.json({populatedPost});
        }
    } catch(e){
        console.log(e);
    }
});


module.exports = router;