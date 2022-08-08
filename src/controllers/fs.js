const File = require('../models/fs')
const User = require('../models/user')
const error = require("../errors/error")
const util =  require("util")
const fs = require("fs")
const path = require("path")
const {readStream, writeStream, removeFile} = require("../utilities/fs")
const { rename } =require('node:fs/promises')
const { DateTime } = require("luxon")
const { StatusCodes } = require('http-status-codes')

class Files {
    async create(req, res, next) {
        try{
        
            let {name , extensionName , content} = req.body
            if(!name || !extensionName, !content) throw new error.BadRequestError("Input correct fields")
          
            const file = new File({name , extensionName })
              file.url = `${name}${file._id}.${extensionName}`
             file.owner = req.user._id
             const location = path.join(__dirname, "../..", `uploads/${file.url}`)
             const write = await writeStream(location, content, true)
              if (!write)throw new error.InternalServerError("Error writing files")
             const dt = DateTime.now()
              file.date =  `created ${dt.toLocaleString(DateTime.DATETIME_MED)}` 
              
              await file.save()
              res.locals.status = true
              const data = {
              status : true,
              message : "File created Successfully",
               file
               }
        res.status(201).json({data, error : {}})
              }catch(err) {
            console.log(err.message)
            res.locals.status = false
           res.status(400).json({data:{}, error : err.message})
        }
    }
    async getOne(req, res, next) {
        try{

            const {id : fileId} = req.params
            const file = await File.findOne({_id :fileId, owner : req.user._id})
            if(!file) throw new error.NotFoundError("File does not exist")
       
           const location = path.join(__dirname, "../..", `uploads/${file.url}`)
           const readFile = await readStream(location, "Error reading file")   
      
           const data = {
            file ,
            status : true,
            content : readFile,

        }
         res.status(200).json({data, error : {}})
        }catch(error) {
      console.log(error.message)
        }
    }           


    async getAll(req, res, next) {
     try {
        
        let username = await User.findById(req.user.id).select('name')
        username = username.name
        console.log(username)
        const files = await File.find({owner : req.user._id})
        .select("name extensionName owner date")
        .sort("-createdAt")

              
        const dt = DateTime.now()
        const time =  `${dt.toLocaleString(DateTime.DATETIME_MED)}` 
         res.locals.status = true
         res.locals.username = username
         res.locals.time = time
         res.status(StatusCodes.OK).render("dashboard" ,{ data: files, error : {}})
     }catch(error) {
        
        res.locals.status = false
        console.log(error.message)
        res.status(error.statusCode).render("dashboard" ,{ data: [], error : {}})
     }
        
    } 
    async edit(req, res, next) {
        try {
        const {id : fileId} = req.params
        const file = await File.findOne({_id :fileId, owner : req.user._id})
        if(!file) throw new error.NotFoundError("File doesn't exist")
        const oldLocation = path.join(__dirname, "../..", `uploads/${file.url}`)

       // check if all body keys can be updated
        const updates = Object.keys(req.body)
        const allowedTasksUpdates = ['name', "extensionName", "content"]
        const isValidOperation = updates.every((taskUpdate) => {
        return allowedTasksUpdates.includes(taskUpdate)
        })


        let err = false
        if(!isValidOperation) throw new error.NotFoundError("Property not found")
        updates.forEach(async update => { 
            if(update == "name" || update == "extensionName") {
                file[update] = req.body[update]
            } else {
                  const write = await writeStream(oldLocation, req.body[update], true)
                   err = !write ? true : false 
            }
        })
        if(err) throw new error.InternalServerError("Error updating file")
        
        file.url = `${file.name}${file._id}.${file.extensionName}`
        const newLocation =  path.join(__dirname, "../..", `uploads/${file.url}`)
        await rename(oldLocation, newLocation)
        if(!fs.existsSync(newLocation)) throw new error.InternalServerError("Error updating file")
      
        const dt = DateTime.now()
        file.date =  `updated ${dt.toLocaleString(DateTime.DATETIME_MED)}` 
        
        await file.save()


         

        const data = {
            message : "Updated successfully",
            status : true,
            file,
        }
 res.send(data)
    }
             catch(error){
            console.log(error.message)
             }
    }
    async delete(req, res, next) {
            const {id : fileId} = req.params
            const file = await File.findOne({_id :fileId, owner : req.user._id})
            if(!file) throw new error.NotFoundError("File doesn't exist")


            const location = path.join(__dirname, "../..", `uploads/${file.url}`)
           console.log(location)
            const rmFile = await removeFile(location, true)
          console.log(rmFile)
            if(!rmFile) throw new error.InternalServerError("File couldn't be deleted")
            await file.remove()
            res.send("done")
        }
}

const files = new Files() 
module.exports = files