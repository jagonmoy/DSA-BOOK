const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  username: {
    type: String ,
    unique:true ,
  },
  bloodGroup : {
    type: String ,
  },
  address : {
    type: String ,
  },
  institution: {
    type: String,
  },
},{
  timestamps : true
});

const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;