const mongoose = require("mongoose")

const assignmentResponseSchema = mongoose.Schema({

    attachments:{
        type:[String],

    },
    assignmentId:{
        type:mongoose.Schema.ObjectId,
        ref:"Assignment"
    },
    privateMessage:{
        type:String,

    },
    submittedOn:{
        type:Date,
        required:[true,"Please specify when you submit the assignment"]
    },
    assignmentResponseStatus:{
        type:String,
        enum:["handed_in","done_late"]
    },
    grade:{
        type:String
    },marks:{
        type:Number,

    },
    isChecked:{
        type:Boolean,
        default:false
    },
    teacherRemarks:{
        type:String,
    },
    reviewedOn:{
        type:Date
    },
    createdOn:{
        type:Date,
    }
})


const AssignmentResponse = mongoose.model("AssignmentResponse",assignmentResponseSchema)
module.exports = AssignmentResponse