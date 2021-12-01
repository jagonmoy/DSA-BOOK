const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
  role : {
    type: String, enum: ['admin', 'general'] 
  },
  users : [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
},{
  timestamps : true
});

const Role = mongoose.model("role", roleSchema);

module.exports = Role;