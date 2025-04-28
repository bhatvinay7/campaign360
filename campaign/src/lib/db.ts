import mongoose, { Mongoose } from 'mongoose';

const MONGODB_URI: string  = process.env.MongoDB_URL!;




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
