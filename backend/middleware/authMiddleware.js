const {promisify} = require('util')
const contentNegotiation = require("../utils/contentNegotiation")
const jwt = require('jsonwebtoken')

exports.isSignedIn = async(req, res,next) => {
    try {
      try { 
          const token = req.headers.authorization;
          const decoder = await promisify(jwt.verify)(token,process.env.JWT_SECRET);
          if (decoder.username !== "undefined") return contentNegotiation.sendResponse(404,"Sign Out First And Then Try Again!",req,res,null);
          next()
      } catch { 
         next();
      }
    } 
    catch (error) {
      contentNegotiation.sendResponse(404,error.message,req,res,null);
    }
};
exports.notSignedIn = async(req, res,next) => {
    try {
        try { 
            const token = req.headers.authorization;
            const decoder = await promisify(jwt.verify)(token,process.env.JWT_SECRET);
            if (decoder.username === "undefined") return contentNegotiation.sendResponse(404,"Sign in First And Then Try Again!",req,res,null);
            next()
        } catch {
            return response.errorAuthResponse(404,"Sign in First And Then Try Again!",res);
        }
    } 
    catch (error) {
      contentNegotiation.sendResponse(404,error.message,req,res,null);
    }
};