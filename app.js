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
const Post = require('./models/Post.js');
const Follows = require('./models/Follows.js');
const Like = require('./models/Like.js');
const {storage} = require('./cloudinaryConfig.js');
const multer  = require('multer')
const upload = multer({ storage });
const passport = require('passport');
const {userValidator,postValidator} = require('./middelware.js');
const expressError = require('./utils/expressError.js');
const session = require('express-session');
const LocalStrategy = require('passport-local').Strategy;
const wrapA = require('./utils/wrapAsync.js');
const {ensureAuthenticated} = require('./middelware.js');

const singUpRouter = require('./routes/user.js');




const main = async()=>{
    await mongoose.connect(Mongo_Url);
}
main()
.then(()=>{
    console.log('connection successfull');
}).catch((err)=>{
    console.log(err);
});




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







// home route;
app.get('/', async (req,res)=>{
    let pst = await Post.find().populate('user');
    res.render('listings/home',{pst});
});

app.get('/home', async (req,res)=>{
    let pst = await Post.find().populate('user');
    res.render('listings/home',{pst});
});


// post route
app.post('/home/profile/:id',async(req,res)=>{
   let {id} = req.params;
   let {username} = req.query;
   console.log(username);
   let post = await Post.findById(id).populate('user').populate('likes').populate('comments');
   let user = await User.findByUsername(username).populate('follower').populate('following');
   console.log(user.follower.length);
    res.render('listings/userProfile.ejs',{post , user});
});

//post route
app.post('/post',postValidator,upload.single('mediaUrl'),async (req,res)=>{
     
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




// like route
app.post('/like/:id',async (req,res)=>{
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

       console.log("done")
    } catch(e){
        console.log(e);
    }
});


// liked route
app.post('/liked',async(req,res)=>{

   try{
    let {userId} = req.body;
    let likedUser = await User.findById(userId).populate('likedPost');
    console.log(likedUser);
     res.json({likedUser});
   } catch(e){
       console.log("this  is error",e);
   }
})



// unlike route
app.post('/unlike/:id',async (req,res)=>{
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






app.use('/',singUpRouter);

app.get('/:username',ensureAuthenticated,(req,res)=>{
    let currUser = res.locals.currUser;
    res.render('listings/Profile.ejs');
})



app.use((err,req,res,next)=>{
    let {statusCode=500,message} = err;
    console.log(message);
    res.send("somethin internal error");
    
});


app.listen('8080',()=>{
    console.log("server is working");
})