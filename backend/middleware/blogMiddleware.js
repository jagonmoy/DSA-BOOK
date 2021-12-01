const {promisify} = require('util')
const contentNegotiation = require("../utils/contentNegotiation")
const jwt = require('jsonwebtoken')
const {UserService} = require("../service/userService")
const {MongoUserDao} = require("../dao/user/mongoUserDao")

const mongoUserDao = new MongoUserDao();
const userService = new UserService(mongoUserDao);

exports.protect = async(req, res,next) => {
    try {
      let token = req.cookies.jwt ;
      if (typeof req.cookies.jwt === "undefined") {
        return contentNegotiation.sendResponse(401,"You are not logged in",req,res,null);
      }
      else token = req.cookies.jwt;

      let decoded;
      try {
        decoded = await promisify(jwt.verify)(token,process.env.JWT_SECRET);    
      }
      catch(error) {
        next();
      }
      
      const legitUser = await userService.getUser(decoded.username);
      if(typeof legitUser.username === "undefined") contentNegotiation.sendResponse(401,"Token Belongs To the User Does not Exits",req,res,null);
  
      req.body.username = decoded.username;
  
      next();
    } 
    catch (error) {
      contentNegotiation.sendResponse(404,error.message,req,res,null);
    }
};