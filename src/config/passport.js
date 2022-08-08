const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const User = require("../models/user")
const error = require("../errors/error")




//Function to configure strategy
//error is the first parameter passed to done
function initialize (passport) {
    const authenticateUser = async(email, password, done) => {
        try {
            //find the email and compare the password
            const user  = await User.findOne({email})
            console.log(user)
          if(!user) return done(null, false, {message: 'No user with that email'})
            if(!await bcrypt.compare(password, user.password))  return done(null, false, {message : 'Password incorrect'}) 
             else  {
                if(!user.isVerified)  return done(null, false, {message : "Verify email first"}) 
                else  return done(null, user)
             }

              }       catch(error) {
                
               return done(error)
            }  
    }

//Passport uses the user authentication with options(optional) as first parameter
passport.use(new LocalStrategy({usernameField: 'email'}, authenticateUser))
//The object id from serialize user  is saved in the session and is later used to retrieve the whole object via the deserializeUser function.
passport.serializeUser((user, done) => done(null, user._id))
passport.deserializeUser(async (id, done) => done(null, await User.findById(id)))

}
module.exports = initialize
