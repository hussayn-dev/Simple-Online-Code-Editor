
require("express-async-errors")

const express = require("express")
const passport = require("passport")
const path = require("path")
const session = require('express-session')
const flash = require("express-flash")
var logger = require('morgan');

const app = express()
const fsRouter = require('./routes/fs')
const authRouter = require('./routes/auth')
const webRouter = require("./routes/webroutes")
const extRouter = require("./routes/extension")
const initializePassport = require('./config/passport')



// const {read} = require("./controllers/extension")
// read()
// app.use(flash)



app.set("views", path.join(__dirname, "..", "views"));
app.set("view engine", "ejs");
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, "..", "public")));



// var ensureLogIn = require('connect-ensure-login').ensureLoggedIn;


// var ensureLoggedIn = ensureLogIn();
// console.log(ensureLoggedIn)
//Passport
initializePassport(passport)

app.use(session({
    secret : "secret",
    resave : false,  
    saveUninitialized: false
}))

app.use(passport.authenticate('session'));
app.use(function(req, res, next) {
    const msgs = req.session.messages || [];
    res.locals.messages = msgs ;
    res.locals.hasMessages = !! msgs.length;
    req.session.messages = [];
    next();
  });

  app.use(webRouter)
  app.use(authRouter)
  app.use(fsRouter)
  app.use(extRouter)




module.exports = app;

