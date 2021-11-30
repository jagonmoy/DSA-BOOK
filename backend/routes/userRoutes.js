const express = require('express');
const userController = require('../controller/userController');
const userRouter = express.Router();
 
 

userRouter.get('/',userController.getAllUsers);
userRouter.get('/:username',userController.getUser);
userRouter.get('/:username/myblog',userController.getMyBlog);

module.exports = userRouter;