import mongoose from "mongoose";

const Connection = async () =>{
const URL = "mongodb://wildwood_growshine:Growshine2023@103.93.16.46:27017/wildwood_growshinedb"
//const URL = "mongodb://localhost:27017/grow_and_shine"
try {

     await mongoose.connect(URL, { useUnifiedTopology: true, useNewUrlParser: true });
    console.log("db connected")
    
} catch (error) {
    console.log(error.message)
}



}

export default Connection