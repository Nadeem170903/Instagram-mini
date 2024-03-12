const express = require('express');
const router =  express.Router({mergeParams:true});
const User = require('../models/User.js');
const wrapA = require('../utils/wrapAsync.js');






 // users messages
 router.get('/',(req,res)=>{
    res.render('listings/messages.ejs');
 });

 router.post('/:id',async(req,res)=>{
    let {id} = req.params;
    console.log(id);
    let reciever = await User.findById(id);
    console.log(reciever);
    res.render('listings/messages.ejs',{reciever})

 });

 router.post('/chates/:participant',async(req,res)=>{

    try{
        let {participant} = req.params;
        let {senderId,messageContent} = req.body;
        console.log('this is senderId',senderId);
        console.log('this is participantId',participant);
        console.log('this is message content',messageContent);
        res.json("reques accepted");
    } catch(er){
        res.status(500,"something wrong in this routes")
    }
     });


     module.exports = router;