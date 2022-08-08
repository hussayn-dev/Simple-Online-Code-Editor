const express = require("express")
const router = express.Router()
const web = require("../controllers/webcontroller")
const {isLoggedIn, notLoggedIn} = require("../middlewares/auth")


router.get("/user/verify-email", notLoggedIn, web.verifyEmail)
router.get("/signUp", notLoggedIn, web.signUp)
router.get("/login", notLoggedIn, web.login)
router.get("/create",isLoggedIn, web.create)
router.get("/view", web.view)


module.exports = router