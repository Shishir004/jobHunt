const Application=require('../models/application.model')
const Job=require('../models/job.model')
const applyJob=async (req,res)=>{
    try {
        const userId=req.id;
        const jobId=req.params.id;
        if(!jobId)
        {
            return res.status(404).json({ message: "job id not found",success:false});
        }
        // check weather it is applied or not
        const isApplied=await Application.findOne({job:jobId,applicant:userId});
        if(isApplied)
        {
            return res.status(400).json({message:"you have already applied",success:false})
        }
        const job=await Job.findById(jobId);
        const createApplicantion=await Application.create({
            job:jobId,
            applicant:userId
        })
        job.applications.push(createApplicantion._id);
        await job.save();
        return res.status(200).json({ message: "job applied successfully",success:true});
    } catch (error) {
        console.log(error)
    }
}
const getAllAppliedJobs=async(req,res)=>{
    try {
        const userId=req.id;
        const application=await Application.find({applicant:userId}).sort({createdAt:-1})
        .populate({path:'job',populate:{path:'companyId'}})
        if(!application ||  application.length === 0)
        {
            return res.status(404).json({ message: "no application found",success:false});
        }
        return res.status(200).json({application,success:true})
    } catch (error) {
        console.log(error);
    }
}
// admin will found how many users have applied
const getApplicants=async(req,res)=>{
    try {
        const jobId=req.params.id;
        const job=await Job.findById(jobId).populate({path:'applications',sort:{createdAt:-1},populate:{path:'applicant'}})
        if(!job)
        {
             return res.status(400).json({message:"not found",success:false})
        }
        return res.status(200).json({message:"applicants are",job})
    } catch (error) {
        console.log(error);
    }
}
const updateStatus=async(req,res)=>{
    try {
        const {status}=req.body;
        const applicationId=req.params.id;
        if(!status)
        {
            return res.status(400).json({message:"not found",success:false})
        }
        // now finding the application by applicantion id
        const application=await Application.findOne({_id:applicationId})
        if(!application)
        {
            return res.status(400).json({message:"not found",success:false})
        }
        // update the status
        application.status=status.toLowerCase();
        await application.save();
        return res.status(200).json({message:"update successfully",application})

    } catch (error) {
        
    }
}
module.exports={applyJob,getAllAppliedJobs,getApplicants,updateStatus}