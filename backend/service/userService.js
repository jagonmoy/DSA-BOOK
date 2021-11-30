class UserService {
    constructor(userDao) {
      this.userDao = userDao;
    }
    async getAllUsers(req) {
        return this.userDao.getAllUsers(req);
    }
    async getUser(username) {
        return await this.userDao.getUser(username)
    }
  }
  module.exports = {UserService}