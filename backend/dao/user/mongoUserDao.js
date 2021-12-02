const  mongoUser = require("../../models/userModel");
const {UserDao} = require ("./userDao");



class MongoUserDao extends UserDao {
  async getAllUsers(req) {
    const mongoUsers = await mongoUser.find(req.body);
    if (!mongoUsers.length) return "users Don't Exist";
    let allUsers = [];
    for (let i = 0; i < mongoUsers.length; i++) {
      allUsers[i] = new UserDto(mongoUsers[i]);
    }
    return allUsers;
  }
  async getUser(username) {
    let user = await mongoUser.findOne({ username });
    if (!user) return "This Username doesnot exist";
    return new UserDto(user);
  }
}
module.exports = {MongoUserDao};