import mongoose from "mongoose";


const RegionSchema  = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    status:{
        type:Boolean,
        default:true
    }
},{
    timestamps:true
})


const regionModel  = mongoose.model("region",RegionSchema)
export default regionModel