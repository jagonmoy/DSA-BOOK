const jwt = require('jsonwebtoken')

exports.sendToken = (username) => {
    const token =  jwt.sign({username : username},process.env.JWT_SECRET,{
      expiresIn: process.env.JWT_EXPIRE
    })
    const cookieOptions = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRE*24*60*60*1000  
      ),
      //secure: true
      httpOnly: true
    };
    return {cookieOptions,token};
}
  