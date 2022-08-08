const mongoose = require("mongoose")
const fileSchema = new mongoose.Schema({
    name : String,
    url : String,
    owner : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    extensionName : String,
    date : String

}, {
   timestamps : true
})

module.exports = mongoose.model("File", fileSchema)