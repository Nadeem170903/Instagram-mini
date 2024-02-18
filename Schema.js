const Joi = require('joi');


module.exports.postSchema = Joi.object({
    user: Joi.string().required(),
    caption: Joi.string().allow('').optional(),
    media:Joi.array().items(Joi.object({
        filename:Joi.string(),
        url:Joi.string(),
    })),
    likes:Joi.array().items(Joi.string(),Joi.number()),
    comment:Joi.array().items(Joi.object({
        user:Joi.string().required(),
        text:Joi.string().required(),
    })),
    location: Joi.string().allow('').optional(), 
});

module.exports.userSchema = Joi.object({
    fullname:Joi.string().required(),
    username: Joi.string().required(),
    contact: Joi.object({
        email:Joi.string(),
        mobile_no:Joi.number(),
    }).required(),
    profile:Joi.object({
        filename:Joi.string(),
        url:Joi.string(),
    }),
    follower:Joi.string(),
    following:Joi.string(),
});