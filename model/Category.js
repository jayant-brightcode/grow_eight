import mongoose from "mongoose";


const CategorySchema  = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    category_image:{
        type:String
    },
    status:{
        type:Boolean,
        default:true
    }
},{
    timestamps:true
})


const categoryModel  = mongoose.model("category",CategorySchema)
export default categoryModel