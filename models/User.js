const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');




const userSchema = new Schema({
    fullname:{
        type:String,
        requird:true
    },
    username:{
        type:String,
        requird:true
    },
    contact: {
        email: {
            type: String,
            validate: {
                validator: function (value) {
                    return this.contact.mobile_no || value; // Require email if mobile_no is not present
                },
                message: 'Email or mobile_no is required'
            }
        },
        mobile_no: {
            type: Number,
            validate: {
                validator: function (value) {
                    return this.contact.email || value; // Require mobile_no if email is not present
                },
                message: 'Email or mobile_no is required'
            }
        }
    },
    profile:{
        filename:{
            type:String,
        },
        url:{
            type:String,
        }
    },
    likedPost:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post',
    }],
    follower:[{
        type:mongoose.Schema.Types.ObjectId , ref:'Follows'
    }],
    following:[{
        type:mongoose.Schema.Types.ObjectId , ref:'Follows'
    }]

});

userSchema.plugin(passportLocalMongoose);


const User = mongoose.model('User',userSchema);

module.exports = User;

