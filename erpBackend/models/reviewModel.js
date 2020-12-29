const mongoose = require("mongoose")


const reviewSchema = mongoose.Schema({
    reviewBy:{
        type:mongoose.Schema.ObjectId,
        ref:"Student",
        required:[true,"Please Specify the review by"]

    },
    reviewTo:{
        type:mongoose.Schema.ObjectId,
        ref:"Teacher",
        required:[true,"Please Specify the reviewTo"]

    },
    rating:{
        type:Number,
        required:[true,"Please Specify the rating"]
    },message:{
        type:String,
        
    },
    createdOn:{
        type:Date,
        required:true
    }

})

const Review = mongoose.model("Review",reviewSchema)
module.exports = Review