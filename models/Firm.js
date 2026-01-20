const mongoose=require('mongoose');
const firmSchema=new mongoose.Schema({
        firmName:
        {
            type:String,
            unique:true,
            area:String,
            category:String
        
        },
        area:
        {
            type:String,
            required:true


        },


        
        category:
        {
            type:[
                {
                   type:String,
                   enum:['veg','non-veg','both']
               }],
            
        },
        region:
        {
            type:[{

                type:String,
                enum:['north-india','south-india','east-india','west-india','central-india']
            }]
        },
        offer:{
            type:String,

        },

        image:
        {
            type:String,
        },
        vendor:[{
           
            type:mongoose.Schema.Types.ObjectId, //we are relating vendor with firm
            ref:'Vendor'//is it coorrect ? 
        }]

});
const Firm=mongoose.model('Firm',firmSchema);
module.exports=Firm;
