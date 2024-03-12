const mongoose = require('mongoose');
const schema = mongoose.Schema;


const conversationSchema = new schema({
    sender:{
        type:mongoose.Types.ObjectId,
        ref:'User'
    },
    receiver:{
        type:mongoose.Types.ObjectId,
        ref:'User'
    },
    messages:[{type:mongoose.Types.ObjectId,ref:'Message'}]
})


const messageSchema = new schema({
    conversation:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Conversation'
    },
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    content:{
        type:String,
        requird:true
    },
    timeSpan:{
        type:Date,
    }
});


const Message = mongoose.model('Message',messageSchema);
const Conversation = mongoose.model('Conversation',conversationSchema);

module.exports = {Message , Conversation}