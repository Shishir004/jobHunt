const mongoose=require('mongoose');
const applicationSchema=new mongoose.Schema({
    job:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Job',
        required:true
    },
    applicant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    status:{
        type:String,
        enum:["PENDING","ACCEPTED","REJECTED"],
        default:"PENDING"
    }
},{timestamps:true})
const Application=mongoose.model('Application',applicationSchema);
module.exports=Application;