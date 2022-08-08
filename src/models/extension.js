const mongoose = require("mongoose")
const extSchema = new mongoose.Schema({
    name: {
        type: String,
        lowercase : true 
    },
    type: String,
    extensions : Array
})

module.exports = mongoose.model("Extension", extSchema)