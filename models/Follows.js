const mongoose =require('mongoose');
const Schema = mongoose.Schema;




const followsSchema = new Schema({
    follower:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    following:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
});


const Follows = mongoose.model('Follows',followsSchema);


module.exports = Follows;