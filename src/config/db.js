const mongoose = require('mongoose')
const startDatabase = () => {
    mongoose.connect('mongodb://127.0.0.1:27017/fs-ass')
}
module.exports = {
    startDatabase
}