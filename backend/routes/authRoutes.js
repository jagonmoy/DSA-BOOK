const express = require('express');
const authController = require('../controller/authController');
const userValidator = require("../validation/userValidator");
const authMiddleware = require("../middleware/authMiddleware")
const authRouter = express.Router();
 
 
authRouter.post('/signup',authMiddleware.isSignedIn,userValidator.signupUserValidation(),userValidator.validate,authController.signup);
authRouter.post('/signin',authMiddleware.isSignedIn,userValidator.signinUserValidation(),userValidator.validate,authController.signin);
authRouter.post('/signout',authController.signout);
authRouter.post('/createRole',authController.createRole);


module.exports = authRouter;