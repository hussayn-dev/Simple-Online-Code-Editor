const {StatusCodes} = require("http-status-codes")
const error = require("../errors/error")
const User = require("../models/user")



class Web {
    async verifyEmail(req, res, next) {
     try{
        const {token, email} = req.query
        const user = await User.findOne({ email });
       if (!user)  throw new error.UnauthenticatedError('Verification Failed, SignUp again');
      if(user.isVerified == true)  throw new error.BadRequestError('Re-verification failed');
       if(user.verificationToken != token) throw new error.UnauthenticatedError('Verification Failed, SignUp again');
       console.log(user)
       user.isVerified = true,
         user.verified = Date.now();
       user.verificationToken = '';
      await user.save();
      const data = {
        message : "Account Verification Successful, Click here to Login",
        status :  true,
      }
      console.log(data)
       res.status(StatusCodes.OK).render("verify-email", {error: null, data})
     } catch(error) {
      const data = null
     res.status(error.statusCode).render("verify-email", {error, data})
     }
    }
    async signUp(req, res, next) {
      const error = {}
      res.status(StatusCodes.OK).render("signUp", {error})
    }
        async login (req, res, next) {

        const error = {}
        res.status(StatusCodes.OK).render("login", {error})
          }
  async create (req, res, next) {
    const error = {}
    res.status(StatusCodes.OK).render("create", {error})
  }
  async view (req, res, next) {
    const error = {}
    res.status(StatusCodes.OK).render("view", {error})
  }

}


const web = new Web()
module.exports = web