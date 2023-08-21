import mongoose from "mongoose";



const FmgePassSchema = new mongoose.Schema({

   country:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"country",
    required:true
   },

   percentage:{
    type:Number,
    required:true
   },

},{
    timestamps:true
})


const fmgePassModel = mongoose.model("fmge_passing_rate",FmgePassSchema)
export default fmgePassModel