import mongoose from "mongoose";

const CallRequestSchema = new mongoose.Schema({


   user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user"
   },
   




},{
    timestamps:true
})


const callrequestModel = mongoose.model("call_request",CallRequestSchema)
export default callrequestModel