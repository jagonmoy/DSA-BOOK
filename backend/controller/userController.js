const contentNegotiation = require("../utils/contentNegotiation")
const {UserService} = require("../service/userService")
const {MongoUserDao} = require("../dao/user/mongoUserDao")
const  MongoUser = require("../models/userModel")

const mongoUserDao = new MongoUserDao();
const userService = new UserService(mongoUserDao);

exports.userService = userService ;

exports.getAllUsers = async (req, res) => {
 try {
   const users = await userService.getAllUsers(req);
   return contentNegotiation.sendResponse(200,users,req,res);
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

    await MongoUser.findOne({username}).populate({path: 'blogs' , options: { sort: { createdAt: -1 } , skip : skip , limit : limit}}).exec(async function (err, user) {
      if(err) {
       return contentNegotiation.sendErrorResponse(404,err.message,req,res)    
      }
      else {
      const mongoBlogs = user.blogs;
      if (!mongoBlogs.length) return contentNegotiation.sendErrorResponse(404,"blogs doesnot exist",req,res)        
      else return contentNegotiation.sendResponse(200,mongoBlogs,req,res)
      }
    });
} 
catch (error) { 
  return contentNegotiation.sendErrorResponse(404,error.message,req,res)    
}
 };