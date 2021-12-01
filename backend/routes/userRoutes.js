const express = require('express');
const userController = require('../controller/userController');
const blogMiddleware = require("../middleware/blogMiddleware")
const userRouter = express.Router();
 
 

userRouter.get('/',userController.getAllUsers);
userRouter.get('/:username',userController.getUser);
userRouter.get('/:username/myblog',userController.getMyBlog);
userRouter.get('/profile/:username',userController.getProfile);
userRouter.post('/profile',blogMiddleware.protect,userController.createProfile);
userRouter.patch('/profile/:username',blogMiddleware.protect,userController.updateProfile);
userRouter.delete('/profile/:username',blogMiddleware.protect,userController.deleteProfile);

module.exports = userRouter;