const express = require('express');
const router =  express.Router({mergeParams:true});
const User = require('../models/User.js');
const Post = require('../models/Post.js');
const {storage} = require('../cloudinaryConfig.js');
const multer  = require('multer')
const upload = multer({ storage });
const {userValidator,postValidator} = require('../middelware.js');
const wrapA = require('../utils/wrapAsync.js');




//post route
router.post('/',postValidator,upload.single('mediaUrl'),async (req,res)=>{
    let {caption,location} = req.body;
    let newPost = new Post({caption,location});
    newPost.user = res.locals.currUser.id;
    let newUrlFilename = {
        filename : req.file.filename,
        url: req.file.path,
    }
    newPost.media.push(newUrlFilename);
    let savepst = await newPost.save();
    console.log(savepst)
    res.redirect('/home');
});




module.exports = router;