const Job = require("../models/job.model");

const postJob=async (req,res)=>{
    try {
        const {title,description,requirements,Salary,location,jobType,experience,companyId,position}=req.body;
        const userId=req.id;
        if(!title || !description || !requirements || !Salary || !experience || !location|| !jobType || !companyId || !position)
        {
            return res.status(400).json({message:"Enter every field",success:false});
        }
        const job =await Job.create({
            title,
            description,
            requirements : requirements.split(","),
            Salary,
            location,
            jobType,
            companyId,
            position,
            experience,
            createdBy:userId
        })
        return res.status(200).json({message:"Job posted successfully",job,success:true})

    } catch (error) {
        console.log(error);
    }
}
// student
const getAllJobs=async (req,res)=>{
    try {
        const keyword=req.query.keyword || "";
        const query={
            $or:[
                {title:{$regex:keyword,$options:"i"}},
                {description:{$regex:keyword,$options:"i"}}
            ]
        }
        const jobs=await Job.find(query).populate({
            path:"companyId"
        }).sort({createdAt:-1});
        if(jobs.length==0)
        {
            return res.status(404).json({message:"job not found",success:false})
        }
        return res.status(200).json({message:"job",success:true,jobs})
    } catch (error) {
        console.log(error);
    }
}

// student
const getAllJobsById=async(req,res)=>{
    try {
        const jobId=req.params.id;
        const jobs=await Job.findById(jobId).populate({
            path:"applications"
        });
        if(!jobs)
        {
            return res.status(404).json({message:"job not found"})
        }
        return res.status(200).json({message:"job fetched",success:true,jobs});
    } catch (error) {
        
    }
}
// admin
const getAdminJobs=async(req,res)=>{
    try {
        const adminId=req.id;
        const jobs=await Job.find({createdBy:adminId});
        if(!jobs)
        {
            return res.status(404).json({message:"job not found"})
        }
        return res.status(200).json({message:"job fetched",success:true,jobs});
    } catch (error) {
        console.log(error);
    }
}
module.exports={postJob,getAllJobs,getAllJobsById,getAdminJobs};