import mongoose from "mongoose";

const ProcessingFeeSchema = new mongoose.Schema({


   video:{
    type:String,
    required:true
   },
   installment_one_amount:{
    type:Number,
    required:true
   },
   installment_one_gst:{
    type:Number,
    required:true
   },
   installment_one_total:{
    type:Number,
    required:true
   },
   installment_two_amount:{
    type:Number,
    required:true
   },
   installment_two_gst:{
    type:Number,
    required:true
   },
   installment_two_total:{
    type:Number,
    required:true
}

  




},{
    timestamps:true
})


const processingfeemodel = mongoose.model("processing_fee",ProcessingFeeSchema)
export default processingfeemodel