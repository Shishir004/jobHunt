const express=require("express");
const { registerCompany, getCompany, getCompanyById,updateCompany } = require("../controllers/company.controllers");
const isAuthenticated = require("../midddlewares/isAuthenticated");
const router=express.Router();
router.post('/register',isAuthenticated,registerCompany)
router.get('/get',isAuthenticated,getCompany)
router.get('/:id',isAuthenticated,getCompanyById)
router.put('/update/company/:id',isAuthenticated,updateCompany)
module.exports=router;
