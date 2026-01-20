const Vendor=require('../models/Vendor');
const jwt=require('jsonwebtoken');
const dotEnv=require('dotenv');
dotEnv.config();
const secretKey=process.env.WHATISYOUNAME;
//next is used to perform the next operation after verifying the token
const verifyToken=async(req,res,next)=> 
{

    const token=req.headers.token;
    if(!token)
    {
        return res.status(401).json({error:"Access denied. No token provided."});
    }

    try
    {
        const decoded=jwt.verify(token,secretKey);
        //output:- { vendorId: '64b8f3e2f1d2c2a5b6c7d8e9', iat: 1692091234, exp: 1692094834 }
        const vendor=await Vendor.findById(decoded.vendorId);
        //if vendor is not found
        if(!vendor )
        {
            return res.status(404).json({error:"Invalid token. Vendor not found."});
        }
        //but in mongodb we have _id not id .. how is this working ? Because mongoose maps _id to id automatically
        req.vendorId=vendor._id
        //what are we doing here ? we are storing vendorId in the request object to use it in the next middleware or controller
        next()
    }
    catch(error)
    {
        console.error(error);
        res.status(400).json({error:"Invalid token"});
    }
}

module.exports=verifyToken;