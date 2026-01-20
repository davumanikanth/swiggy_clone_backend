const express=require('express');
const firmController=require('../controllers/FirmController'); // Ensure the filename matches the actual file
const verifyToken = require('../middelwares/verifyToken');
const router=express.Router();
router.post('/add-firm',verifyToken,firmController.addFirm);
module.exports=router;

