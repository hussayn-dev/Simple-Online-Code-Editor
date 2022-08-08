const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcrypt")
const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required: [true, 'Please provide name'],
        minlength : [3, "Name can't bre less than 3 characters"],
        maxlength : [50, "Name can't be more than 50 characters"]
    },
    email: {
        type: String,
        unique: true,
        required : [true, 'Please provide email'],
        validate : {
            validator: validator.isEmail,
            message: "Please provide a valid email"
        },
        lowercase : true,
    },
    password : {
        type: String,
        required : true,
        validate(value) {
            if(value.toLowerCase().includes('password')) {
                throw new Error("Password can't be password")
           
            }
        },
    
        trim : true,
        minlength :  [6, "Password can't be less than 6 characters"]
    },  role: {
        type: String,
        enum: ["user", "admin"],
        default: 'user',
      },
      verificationToken: String,
      isVerified: {
        type: Boolean,
        default: false,
      },
      verified: Date,
} ,{
    timestamps : true
})
userSchema.virtual('file', {
    ref: 'File',
    localField:  '_id',
    foreignField: 'owner'
     
})

userSchema.pre('save' , async function (next) {
    if(this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10)
    
    }
    next()
    })

    module.exports = mongoose.model('User', userSchema)