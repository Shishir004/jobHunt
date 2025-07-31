const express=require('express');
const { applyJob, getAllAppliedJobs, getApplicants, updateStatus } = require('../controllers/application.controller');
const router=express.Router();
router.post('/apply/job/:id',applyJob);
router.get('/getAllAppliedJobs',getAllAppliedJobs);
router.get('/get/Applicants/:id',getApplicants);
router.put('/update/status/:id',updateStatus);
module.exports=router;