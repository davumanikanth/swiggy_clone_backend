const Vendor=require('../models/Vendor');
const jsw=require('jsonwebtoken');// to encrypt the password to hash values
const bcrypt=require('bcryptjs');// to hash the password
const dotEnv=require('dotenv');
const Firm = require('../models/Firm');
dotEnv.config();
const secretKey=process.env.WHATISYOUNAME;

const vendorRegister=async(req,res)=>// async function to handle asynchronous operations
{
    const {username,email,password}=req.body
    try{
        const vendorEmail=await Vendor.findOne({email});
        if(vendorEmail)
        {
            return res.status(400).json("Email already taken")// what does 400 mean here ? 400 means bad request
        }
       
        const hashedPassword=await bcrypt.hash(password,10);

        const newVendor= new Vendor({
            username,
            email,
            password: hashedPassword
        })
        await newVendor.save(); //await is used to wait until the promise is resolved
        res.status(201).json({message: "vendor registered successfully"}); //201 means created
        console.log("registed")
        
    }
    catch(error)
    {
        console.error(error);
        res.status(500).json({error:"vendor internal server error"}) //500 means server error
    }

   
}

const VendorLogin=async(req,res)=>
{
    const{email,password}=req.body;
    try
    {
        const vendor=await Vendor.findOne({email}); // find the vendor by email
        if(!vendor || !await bcrypt.compare(password,vendor.password))// how did we get vendoremail.password ? we got it from the database
        {   
            return res.status(401).json("Invalid email or password");
        }

        const token=jsw.sign({vendorId:vendor._id},secretKey,{expiresIn:'1h'}); // token will expire in 1 hour
         res.status(200).json({message:"Login successful",token});
         console.log("logged in",email);
         console.log("token",token);
    }


    catch(error)
    {
        console.error(error);
        res.status(500).json({error:" login internal server error"})
    }
}
const getAllvendor=async(req,res)=>
{
    try{
        const vendors=await Vendor.find().populate('firm');

        res.json({vendors})


    }
    catch(error)
    {
        console.error(error);
        res.status(500).json({error:"get alll vendor function wroong"})
    }
}

const getSingleRecord=async(req,res)=>
{
    const vendorId=req.params.apple;
    try{
        const vendors=await Vendor.findById(vendorId).populate('firm');
        res.json({vendors})
    }
    catch(error)
    {
        console.error(error);
        res.status(500).json({error:"get single record function wroong"})
    }
}

module.exports ={vendorRegister,VendorLogin,getAllvendor,getSingleRecord};
