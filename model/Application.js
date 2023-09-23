import mongoose from "mongoose";

const ApplicationSchema = new mongoose.Schema({


   user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user"
   },
 
   university:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"university"
   }
   ,
   isPaid:{
    type:Boolean,
    default:false


   }




},{
    timestamps:true
})


const applicationModel = mongoose.model("application",ApplicationSchema)
export default applicationModel