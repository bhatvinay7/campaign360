import mongoose, { Mongoose } from 'mongoose';
import dotenv from "dotenv"
dotenv.config()
const MONGODB_URI: string  = process.env.MongoDB_URL! 


console.log(MONGODB_URI)

const connect=async ()=>{
    
    const connectionState=mongoose.connection.readyState
    if(connectionState===1){
        console.log("connected")
        return
    }
    if(connectionState===2){
        console.log("connecting")
        return
    }
    try{
    
        await mongoose.connect(MONGODB_URI!,{
            //dbName:"nextassignment",
            bufferCommands:false
        })
        console.log("connected")
    }
    catch(error:any){
        // throw new Error("Error in connecting to database")
        console.log(error.message)
    }
}

export default connect;
