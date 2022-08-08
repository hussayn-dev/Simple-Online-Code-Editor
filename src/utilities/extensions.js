const fs = require("fs")

let read = [] 
fs.createReadStream("./extension.json")
.on("data", (data) => {
    data = JSON.parse(data)
   read =  read.concat(data)
}).on("error", () => {
    console.log("error")
}).on("end" , () => {
    return read
})
module.exports = read