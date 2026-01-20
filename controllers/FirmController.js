const Firm=require('../models/Firm');
const Vendor=require('../models/Vendor');
const multer=require('multer');
//controller for firm registration
const addFirm=async(req,res)=>
{
    try{
    const{firmName,area,category,region,offer}=req.body;
     
  //chatgpt code to upload image
  
    const image=req.file? req.file.filename:undefined;
    

//end of chatgpt code
 // we are getting vendorId from the token decoded middleware
  

    const vendorId=await Vendor.findById(req.vendorId);
    if (!vendorId) {
        return res.status(404).json({ error: "Vendor not found" });
    }

    const firm=new Firm({
        firmName,
        area,
        category,   
        region,
        offer,
        image,
        vendor: vendorId._id // we are storing vendorId in the firm model
    })
   const savedFirm = await firm.save();
   vendorId.firm.push(savedFirm._id);
    await vendorId.save();
    return res.status(201).json({message:"Firm registered successfully"});
}

catch(error)
{
    console.error("Error details:", error); // Added detailed error logging
    return res.status(500).json({error:"Firm internal server error"});
}

}

//for image upload using multer -chatgpt
 //code to upload image
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Specify the directory for storing uploaded files
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Generate a unique filename
    }
});

const upload = multer({ storage: storage });
//end chatgpt code
module.exports={addFirm:[upload.single('image'),addFirm]};