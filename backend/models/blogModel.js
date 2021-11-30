const mongoose = require("mongoose");


const blogSchema = new mongoose.Schema({
  username: {
    type: String,
    required:true,
  },
  blogHeadline: {
    type: String,
    required:true
  },
  blogDescription: {
    type: String,
    required:true
  },
},{
  timestamps : true
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
