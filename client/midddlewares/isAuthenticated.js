const jwt=require('jsonwebtoken');
const isAuthenticated=async(req,res,next)=>{
    try {
        const token=req.cookies.token;
        if(!token)
        {
            res.status(400).json({message:"Not Authenticated",success:false});
        }
        const decode=await jwt.verify(token,process.env.SECRET_KEY);
        if(!decode)
        {
            res.status(400).json({message:"Not Authenticated",success:false});
        }
        req.id=decode.userId;
        next();
    } catch (error) {
        console.log(error);
    }
}
module.exports=isAuthenticated;