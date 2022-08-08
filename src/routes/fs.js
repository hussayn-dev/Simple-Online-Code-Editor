const express = require("express")
const files = require('../controllers/fs')
const router = express.Router()
const {isLoggedIn, notLoggedIn} = require("../middlewares/auth")


router.post('/create', files.create)
router.get('/dashboard', files.getAll)
router.route('/one/:id').get(files.getOne).patch(files.edit).delete(files.delete)


module.exports = router