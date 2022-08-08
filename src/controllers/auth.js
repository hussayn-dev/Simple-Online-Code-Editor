const error = require("../errors/error")
const User = require("../models/user");
const sendVerificationEmail = require("../utilities/mails");
const passport = require('passport')
const crypto = require('crypto')
const {StatusCodes} = require("http-status-codes")



class Auth { 
    async login (req, res, next) {
   
      if(!req.body.email || !req.body.password)throw new BadRequestError("input your details")
      req.body.email = req.body.email.toLowerCase()
   passport.authenticate('local', {
      successRedirect : "/dashboard",
      failureRedirect : "/login",
      failureMessage : true
   })(req,res,next)
    }

    
    async signUp (req, res, next) {
       try {
        await User.deleteMany()
        console.log("hi")
        console.log(req.body)
        let {email, password, name } = req.body
        if(!email || !password || !name)  throw new error.BadRequestError( 'Please input fields correctly')

        //check if it is the first account to assign admin
        const isFirstAccount = (await User.countDocuments({})) === 0;
       const role = isFirstAccount ? 'admin' : 'user';

// check if user exists
       email = email.toLowerCase()
        const exist = await User.exists({email})
       if(exist) throw new error.BadRequestError('Email exists, try logging in')
   
   
       const user = new User({role, email, password, name})

       //send email to user for verification, remember to handle general email sending errors
    const verificationToken = crypto.randomBytes(40).toString('hex');
    let origin =req.get('host');
    origin = `http://${origin}`
    const mail = await sendVerificationEmail(name, email,verificationToken,origin)
    if(!mail) throw new error.BadRequestError('User cant be created, try later')
    user.verificationToken = verificationToken
 
    //save created user
    await user.save()
    //send data to front end
    const data = {
        message :  "User created successfully, check email for verification", 
        status : "true"
    }
    res.status(StatusCodes.CREATED).render("created", {data})

       }catch (error) {
        console.log(error)
        res.status(StatusCodes.OK).render("signUp", {error})
       }
    }
    async logOut (req, res, next) {
    
    }
   }
const auth = new Auth() 
module.exports = auth