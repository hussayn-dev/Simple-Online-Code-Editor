const express = require("express")
const router = express.Router()
const auth = require("../controllers/auth")



router.post("/signUp",auth.signUp)
router.post("/signIn", auth.login)
router.post("/logOut", auth.logOut)
router.post("/login", auth.login)






module.exports = router