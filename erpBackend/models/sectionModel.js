const mongoose = require("mongoose")

const sectionSchema = new mongoose.Schema({
    
 
    sectionName:{
        type:String,
        required:[true,"Please specify Section Name"]
    },
    branch:{
        type:mongoose.Schema.ObjectId,
        ref:"Branch",
        required:[true,"Please specify branch name"]
    },
    createdOn:{
        type:Date,
        required:true
    }

})

const Section = mongoose.model("Section",sectionSchema)

module.exports = Section