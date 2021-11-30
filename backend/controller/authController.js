const contentNegotiation = require("../utils/contentNegotiation")
const {AuthService} = require("../service/authService")
const {MongoAuthDao} = require("../dao/auth/mongoAuthDao")
const  sendJWTToken = require("../utils/sendJWTToken")
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken')
dotenv.config({path : './config.env'})

const mongoAuthDao = new MongoAuthDao();
const authService = new AuthService(mongoAuthDao);

exports.authService = authService ;

exports.signup = async (req, res) => {
 try {
   const newUser = await authService.signupUser(req);
   if(typeof newUser === "string") return contentNegotiation.sendErrorResponse(403,newUser,req,res);
   else return contentNegotiation.sendResponse(200,newUser,req,res);
 } 
 catch (error) {
   return contentNegotiation.sendErrorResponse(403,error.message,req,res);
 }
};

exports.signin = async (req, res) => {
  try {
    const user = await authService.signinUser(req);
    if (typeof user === "string") return contentNegotiation.sendErrorResponse(401,user,req,res);
    const token =  jwt.sign({username : user.username},process.env.JWT_SECRET,{
      expiresIn: process.env.JWT_EXPIRE
    })
     
    res.cookie('jwt', token, {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRE*24*60*60*1000  
      ),
      //secure: true
      httpOnly: true
    })
    return contentNegotiation.sendResponse(200,user.username,req,res);
  } catch (error) {
    return contentNegotiation.sendErrorResponse(401,error.message,req,res);
  }
 };
 exports.signout = async (req, res) => {
    res.cookie('jwt', 'null', {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true
    })
    return contentNegotiation.sendResponse(200,"Signed Out Successfully!",req,res);
 };
 
