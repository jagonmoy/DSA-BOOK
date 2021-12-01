const contentNegotiation = require("../utils/contentNegotiation")
const {UserService} = require("../service/userService")
const {MongoUserDao} = require("../dao/user/mongoUserDao")
const  mongoRole = require("../models/roleModel")
const  MongoProfile = require("../models/profileModel")
const MongoUser = require("../models/userModel")

const mongoUserDao = new MongoUserDao();
const userService = new UserService(mongoUserDao);

exports.userService = userService ;

exports.getAllUsers = async (req, res) => {
 try {
    await mongoRole
      .findOne({ role: "general" })
      .populate("users")
      .exec(async function (err, general) {
        if (err) {
          return contentNegotiation.sendErrorResponse(
            404,
            err.message,
            req,
            res
          );
        } else {
          const mongoUsers = general.users;
          if (!mongoUsers.length)
            return contentNegotiation.sendErrorResponse(
              404,
              "Users doesnot exist",
              req,
              res
            );
          else
            return contentNegotiation.sendResponse(200, mongoUsers, req, res);
        }
      });
 } catch (error) {
  return contentNegotiation.sendErrorResponse(404,error.message,req,res);
 }
};
exports.getUser = async (req, res) => {
  try {
    const user = await userService.getUser(req.params.username);
    if(typeof user === "string") return contentNegotiation.sendErrorResponse(404,user,req,res);
    return contentNegotiation.sendResponse(200,user,req,res);
 } catch (error) {
    return contentNegotiation.sendErrorResponse(404,error.message,req,res);
 }
 };

 exports.getMyBlog = async (req, res) => {
  try {
    const username = req.params.username ;
    const page = req.query.page * 1 || 1 ;
    const limit = req.query.limit * 1 ;
    const skip = (page-1)*limit ;

    await MongoUser.findOne({username}).populate({path: 'stories' , options: { sort: { createdAt: -1 } , skip : skip , limit : limit}}).exec(async function (err, user) {
      if(err) {
       return contentNegotiation.sendErrorResponse(404,err.message,req,res)    
      }
      else {
      const mongoBlogs = user.stories;
      if (!mongoBlogs.length) return contentNegotiation.sendErrorResponse(404,"blogs doesnot exist",req,res)        
      else return contentNegotiation.sendResponse(200,mongoBlogs,req,res)
      }
    });
} 
catch (error) { 
  return contentNegotiation.sendErrorResponse(404,error.message,req,res)    
}
 };
 exports.getProfile = async (req, res) => {
  try {
    const username = req.params.username ;
    await MongoUser.findOne({username}).populate('profile').exec(async function (err, user) {
      if(err) {
       return contentNegotiation.sendErrorResponse(404,err.message,req,res)    
      }
      else {
      const mongoProfile = user.profile;
      console.log("getProfile er vitor",mongoProfile)
      if (mongoProfile === undefined || mongoProfile === null) return contentNegotiation.sendErrorResponse(404,"Profile doesnot exist",req,res)        
      else return contentNegotiation.sendResponse(200,mongoProfile,req,res)
      }
    });
} 
catch (error) { 
  return contentNegotiation.sendErrorResponse(404,error.message,req,res)    
}
 };
 exports.createProfile = async (req, res) => {
  try {
    const profile = await MongoProfile.create(req.body);
    const username = req.body.username ;
    const user = await MongoUser.findOne({username});
    user.profile = profile;
    user.save(function(err,result){
      if (err){
      }
      else{
      }
    })
    console.log("create korar por", user.profile);
    return contentNegotiation.sendResponse(201,profile,req,res)
  } catch (error) {
    return contentNegotiation.sendErrorResponse(404,"Profile Creation Unsuccessful",req,res) 
  }
};
exports.updateProfile = async (req, res) => {
  try {
    let profile = await MongoProfile.findOne({username: req.params.username});
    if (profile.username !== req.body.username) return contentNegotiation.sendErrorResponse(403,"Not Have permission to Update",req,res)
    profile = await MongoProfile.findOneAndUpdate({username: req.params.username}, req.body, {
      new: true,
    });
    return contentNegotiation.sendResponse(201,profile,req,res)
  } catch (error) {
    return contentNegotiation.sendErrorResponse(404,error.message,req,res) 
  }
};
exports.deleteProfile = async (req, res) => {
  try {
    let profile = await MongoProfile.findOne({username: req.params.username});
    console.log(profile);
    console.log(req.body);
    if (profile.username !== req.body.username) return contentNegotiation.sendErrorResponse(403,"Not Have permission to Delete",req,res)
    await MongoProfile.findOneAndDelete({username: req.params.username}, req.body);
    return contentNegotiation.sendResponse(201,"Profile Deleted",req,res)
  } catch (error) {
    return contentNegotiation.sendErrorResponse(404,error.message,req,res)  
  }
};