if(process.env.NODE_ENV != "production"){
    require('dotenv').config();
}

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const Mongo_Url = 'mongodb://127.0.0.1:27017/Instagram';
const engine = require('ejs-mate');
const path = require('path');
const User = require('./models/User.js');
const passport = require('passport');
const expressError = require('./utils/expressError.js');
const session = require('express-session');
const LocalStrategy = require('passport-local').Strategy;
const {Message,Conversation} = require('./models/message.js');

const singUpRouter = require('./routes/user.js');
const homeRouter = require('./routes/home.js');
const likeRouter = require('./routes/like.js');
const unLikeRouter = require('./routes/unlike.js');
const followRouter = require('./routes/follow.js');
const unFollowRouter = require('./routes/unfollow.js');
const followerList = require('./routes/followerList.js');
const CreatePostRouter = require('./routes/createPost.js');
const messagesRouter = require('./routes/messages.js');



// connect to database
const main = async()=>{
    await mongoose.connect(Mongo_Url);
}
main()
.then(()=>{
    console.log('connection successfull');
}).catch((err)=>{
    console.log(err);
});



// middelware set
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended:true}));
app.engine('ejs', engine);


const sessionOption = {
    secret: 'mySuperSecretCode',
  resave: false,
  saveUninitialized: true,
  cookies: {
    expires : Date.now() + 7 * 24 * 60 *60* 1000,
    maxAge : 7 * 24 * 60 *60* 1000,
    httpOnly : true
  }
};


// passport authentication
app.use(session(sessionOption));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.currUser = req.user;
    next();
});

// Routing
app.use('/',singUpRouter);
app.use('/home',homeRouter);
app.use('/like',likeRouter);
app.use('/unlike',unLikeRouter);
app.use('/follow',followRouter);
app.use('/unfollow',unFollowRouter)
app.use('/profile/:username/',followerList);
app.use('/post',CreatePostRouter);
app.use('/inbox',messagesRouter);


// error hundeling
app.use((err,req,res,next)=>{
    let {statusCode=500,message} = err;
    console.log(message);
    res.send("somethin internal error");
    
});


app.listen('8080',()=>{
    console.log("server is working");
})