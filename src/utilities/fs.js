const fs = require("fs")
const error = require("../errors/error")


const readStream = (location, message) => {
    return new Promise((resolve, reject) => {
let read
 fs.createReadStream(location)
 .setEncoding('utf-8')
 .on("data", (chunk) => {
read = chunk
 }).on("error", () => {
    reject(new error.InternalServerError(message))
 }).on("end", () => {
    resolve(read)
 })

    })
}
const writeStream = (location, content, message) => {
    return new Promise((resolve, reject) => {
     fs.createWriteStream(location)
     .write(content, "utf-8", (error) => {
 if(error) reject(new error.InternalServerError("Error writing file"))
 resolve(message)
     })

    })
}
const removeFile = (location, message) => {
    return new Promise((resolve, reject) => {
    fs.rm(location, (err) => {
        if(err) reject(new error.InternalServerError("File couldn't be deleted"))
    resolve(message)
    })
    })
}

module.exports = {
    readStream, writeStream, removeFile }