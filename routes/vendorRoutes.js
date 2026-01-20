const vendorController=require('../controllers/vendorController');


const express=require('express');
const router=express.Router();
router.post('/register',vendorController.vendorRegister);
router.post('/login',vendorController.VendorLogin);
router.get('/all-vendor',vendorController.getAllvendor)
router.get('/get-single/:apple',vendorController.getSingleRecord)
module.exports=router;


