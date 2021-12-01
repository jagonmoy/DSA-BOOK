const express = require('express');
const blogController = require('../controller/blogController');
const blogValidator = require("../validation/blogValidator");
const blogMiddleware = require("../middleware/blogMiddleware")
const blogRouter = express.Router();
 
blogRouter.get('/',blogController.getAllBlogs);
blogRouter.get('/myblog/:username',blogController.getPersonBlogs);
blogRouter.get('/:id',blogController.getBlog);
blogRouter.post('/',blogMiddleware.protect,blogValidator.createBlogValidation(),blogValidator.validate,blogController.createBlog);
blogRouter.patch('/:id',blogMiddleware.protect,blogValidator.updateBlogValidation(),blogValidator.validate,blogController.updateBlog);
blogRouter.delete('/:id',blogMiddleware.protect,blogController.deleteBlog);

 
module.exports = blogRouter;