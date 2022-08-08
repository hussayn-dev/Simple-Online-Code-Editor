const Extension = require("../models/extension")
const error = require("../errors/error")
const path = require("path")

const jsonfile = require('jsonfile')
// const read = async () => {
//            await Extension.deleteMany()
//     const file  = path.join(__dirname, "/..", "/extension.json")
//     jsonfile.readFile(file)
//       .then(async obj => {
//         obj.forEach(async element => {
//             const  newExtensions =new Extension(element)
//             console.log(element.name)
//             if(!newExtensions) throw new Error("E no work")
//       await newExtensions.save()
//         });
      
        

   
//       })
//       .catch(error => console.error(error))
    
// }

// searh name
const searchName = async (req, res, next) => {
  try {
    let {search} = req.query
    if(!search) throw new error.BadRequestError("Search the language")
    let sea = search.slice(0, 3)
    var re = new RegExp(`^${sea}`)
    const allExtensions = await Extension.find({name : {
        $regex : re, $options : "i"
    }})
    if(!allExtensions) throw new error.NotFoundError("No extensions")


res.status(200).json({allExtensions})

  } catch(error) {
res.status(error.statusCode).json({message : error.message, status : error.status })
  }


}
const getExtension = async(req, res, next) => {
    try {
        let {name} = req.query
        if(!name) throw new error.BadRequestError("Search the language")
        const extension = await Extension.findOne({name : name.toLowerCase()}).select("extensions -_id")
        if(!extension) throw new error.BadRequestError("Input fields correctly")
        console.log(extension)
        res.status(200).json({extension})
        
    } catch(error) {
        res.status(error.statusCode).json({message : error.message, status : error.status })
    }

}



module.exports = {
    searchName, getExtension
}



