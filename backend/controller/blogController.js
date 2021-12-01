const contentNegotiation = require("../utils/contentNegotiation")
const  MongoBlog = require("../models/blogModel");
const MongoUser = require("../models/userModel")

const {mongoAPIFeatures} = require("../utils/apiFeatures/mongoBlogFeatures");

exports.getAllBlogs = async (req, res) => {
  try {
      let query = mongoAPIFeatures.prototype.filter(req); 
      query = MongoBlog.find(query)
      query = mongoAPIFeatures.prototype.sort(query,req);
      query = mongoAPIFeatures.prototype.paginate(query,req);
      const mongoBlogs = await query;
      if (!mongoBlogs.length) return contentNegotiation.sendErrorResponse(404,"blogs doesnot exist",req,res)
      else {  
      let allBlogs  = [] ;
         for ( let i = 0 ; i < mongoBlogs.length; i++) {
          allBlogs[i] = mongoBlogs[i];
        }
      return contentNegotiation.sendResponse(200,allBlogs,req,res)
      }
  } 
  catch (error) { 
    return contentNegotiation.sendErrorResponse(404,error.message,req,res)    
  }
};


exports.getBlog = async (req, res) => {
  try {  
    const blog = await MongoBlog.findById(req.params.id);
    return contentNegotiation.sendResponse(200,blog,req,res);
  }
  catch (error) {
    return contentNegotiation.sendErrorResponse(404,"blog Doesnot Exist",req,res) 
  }
};


exports.createBlog = async (req, res) => {
  try {
    // console.log("ki holo")
    const newBlog = await MongoBlog.create(req.body);
    const username = req.body.username;
    // console.log("my name is ",username);
    const user = await MongoUser.findOne({username});
    // console.log(user.stories);
    user.stories.push(newBlog);
    // console.log(user);
    user.save(function(err,result){
      if (err){
          console.log(err);
      }
      else{
          console.log(result)
      }
    })
    console.log(user.stories.blogHeadline);
    return contentNegotiation.sendResponse(201,newBlog,req,res)
  } catch (error) {
    return contentNegotiation.sendErrorResponse(404,"Blog Creation Unsuccessful",req,res) 
  }
};

exports.updateBlog = async (req, res) => {
  try {
    let blog = await MongoBlog.findById(req.params.id);
    if (blog.username !== req.body.username) return contentNegotiation.sendErrorResponse(403,"Not Have permission to Update",req,res)
    blog = await MongoBlog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return contentNegotiation.sendResponse(200,blog,req,res)
  } catch (error) {
        return contentNegotiation.sendErrorResponse(404,error.message,req,res)
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    let blog = await MongoBlog.findById(req.params.id);
    if (blog.username !== req.body.username) return contentNegotiation.sendErrorResponse(403, "Not Have permission to delete",req,res)
    await MongoBlog.findByIdAndDelete(req.params.id);
    return contentNegotiation.sendResponse(200,"Blog Deleted",req,res)
  } catch (error) {
    return contentNegotiation.sendErrorResponse(404,error.message,req,res)
  }

};
exports.getPersonBlogs = async (req, res) => {
  try {
      const username = req.params.username ;
      const page = req.query.page * 1 || 1 ;
      const limit = req.query.limit * 1 ;
      const skip = (page-1)*limit ;

      await MongoUser.findOne({username}).populate({path: 'stories' , options: { sort: { createdAt: -1 } , skip : skip , limit : limit}}).exec(async function (err, user) {
        if(err) {
         return contentNegotiation.sendErrorResponse(404,err.message,req,res)    
        }
        else {
        const mongoBlogs = user.stories;
        if (!mongoBlogs.length) return contentNegotiation.sendErrorResponse(404,"blogs doesnot exist",req,res)        
        else return contentNegotiation.sendResponse(200,mongoBlogs,req,res)
        }
      });

  } 
  catch (error) { 
    return contentNegotiation.sendErrorResponse(404,error.message,req,res)    
  }
};

