const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Like = require('./Like.js');




const postSchema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    caption:{
        type:String
    },
    media:[{
        filename:String,
        url:String,
    }],
    likes: [{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Like'
    }],
    comments:[{
       user:{ type:mongoose.Schema.Types.ObjectId,
        ref:'User'},
        text:{
            type:String,
        }
     }],
    location:{
        type:String,
    }
    
});


const Post = mongoose.model('Post',postSchema);

module.exports = Post;

