const contentNegotiation = require("../utils/contentNegotiation")
const {AuthService} = require("../service/authService")
const {MongoAuthDao} = require("../dao/auth/mongoAuthDao")
const mongoUser = require("../models/userModel");
const mongoRole = require("../models/roleModel")
const  sendJWTToken = require("../utils/sendJWTToken")
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken')
dotenv.config({path : './config.env'})

const mongoAuthDao = new MongoAuthDao();
const authService = new AuthService(mongoAuthDao);

exports.authService = authService ;

exports.signup = async (req, res) => {
 try {
    const {email,username} = req.body;
    let newUser = await mongoUser.findOne({email});
    if (newUser) contentNegotiation.sendErrorResponse(403,"Email is not Unique",req,res);
    newUser = await mongoUser.findOne({username});
    if (newUser) contentNegotiation.sendErrorResponse(403,"Username is not Unique",req,res);
    // console.log("hello")
    newUser = await mongoUser.create(req.body);
    const general = await mongoRole.findOne({ role : "general"});
    console.log(general);
    general.users.push(newUser);
    console.log(general);
    general.save(function(err,result){
      if (err){
          console.log(err);
      }
      else{
          console.log(result)
      }
    })
    return contentNegotiation.sendResponse(200,newUser,req,res);
 } 
 catch (error) {
   return contentNegotiation.sendErrorResponse(403,error.message,req,res);
 }
};
exports.createRole = async (req, res) => {
    try {
       role = await mongoRole.create(req.body);
       return contentNegotiation.sendResponse(200,role,req,res);
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
 
