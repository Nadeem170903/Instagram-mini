const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for likes
const LikeSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' // Reference to the user who liked the post
    },
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
    likeCount: {
        type: Number,
        default: 0 // Initial like count
    }
});

// Create the Like model
const Like = mongoose.model('Like', LikeSchema);

module.exports = Like;
