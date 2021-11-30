class AuthService {
    constructor(authDao) {
      this.authDao = authDao;
    }
    async signupUser(req){
        return this.authDao.signupUser(req);
    }
    async signinUser(req){
        return this.authDao.signinUser(req);
    }
  }
  
  module.exports = {AuthService}