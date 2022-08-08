const express = require("express")
const router = express.Router()
const ext = require("../controllers/extension")

router.get("/extensionName", ext.searchName )
router.get("/extensions", ext.getExtension)



module.exports = router