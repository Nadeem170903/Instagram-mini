const {postSchema,userSchema} = require('./Schema.js');
const expressError = require('./utils/expressError.js');



module.exports.postValidator = (req,res,next)=>{
   let {err} = postSchema.validate(req.body);

   if(err){
    throw new expressError(400,err.result);
   } else{
    next();
   }
}

module.exports.userValidator = (req,res,next)=>{
    let {err} = userSchema.validate(req.body);
    if(err){
        res.send("something internal error");
        throw new expressError(400,err.result);
        
    } else{
        next();
    }
}



module.exports. ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}
