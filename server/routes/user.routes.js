const { registerUser, loginUser, logOut, updateProfile } = require("../controllers/user.controllers");
const isAuthenticated = require("../midddlewares/isAuthenticated");
const express=require('express');
const router=express.Router();
router.post('/register',registerUser);
router.post('/login',loginUser);
router.delete('/logout',logOut);
router.put('/update-profile',isAuthenticated,updateProfile);
module.exports=router;


