const mongoose = require("mongoose")



const hostelSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please specify hostel name"]
    },
    year:{
        type:String,
        required:[true,"Please specify hostel year"]
    },
  wardenId:{
      type:mongoose.Schema.ObjectId,
      ref:"Teacher",
      required:[true,"please specify warden id"]
  },
  superVisorId:[{
    type:mongoose.Schema.ObjectId,
    ref:"Teacher",
    required:[true,"please specify supervisor id"]
}],
    createdOn:{
        type:Date,
        required:true
    }

})

const Hostel = mongoose.model("Hostel",hostelSchema)

module.exports = Hostel