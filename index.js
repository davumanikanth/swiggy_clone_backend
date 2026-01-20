const dotEnv = require("dotenv");
dotEnv.config();


const express = require('express');
const mongoose = require("mongoose");
const vendorRoutes=require('./routes/vendorRoutes');
const bodyParser = require('body-parser'); 
const firmRoutes=require('./routes/firmRoutes');
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.error("Failed to connect to MongoDB:", error));


const PORT = process.env.PORT || 4000;
const app = express();

app.use(bodyParser.json());
app.use('/vendor',vendorRoutes);
app.use('/firm',firmRoutes);


app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});



// Serve uploaded files
app.use('/uploads', express.static('uploads'));


app.use('/', (req, res) => {
    res.send("Welcome to Swiggy");
});



