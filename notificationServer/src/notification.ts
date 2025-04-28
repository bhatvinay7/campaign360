// import {ws} from  './socket.js'
// 
// const {subscriber}=require('./lib/redis')

const  express =require('express')
import connect from './db'
import connectToRabbitMQ from './rabbitmq'
import Campaign from './model/campaign'
import User from './model/client'
const router=express()
console.log("connected")
//import {model} from "../src/lib/gemimiAPI/gemini"
import {redisSubscriber,redispublisher} from './redisConnection'


try{
  
  redisSubscriber.subscribe("email");
  
  redisSubscriber.on('error', (err:any) => {
    console.error('Redis connection error:', err);
  })
  
  
  redisSubscriber.on("message", async(channel:any, message:string) => {
    const Id=JSON.parse(message)
    // here I have to fetch data from the DB and add it to rabbitMQ  +++++++++++++++++++++++
    const queue="notificationQueue"
    const rabbitMQchannel=await connectToRabbitMQ()
    await connect()

    const campaign=await Campaign.findOne({campaignId:Id.campaignId})
    const clients=await User.aggregate([
      {
        $match:{"userType":"client"}
      },
      {
        $project:{
          userName:1,
          email:1
        }
      }
    ])
    clients.forEach((e)=>{
      rabbitMQchannel?.publish("notification_exchange","message", Buffer.from(JSON.stringify({userName:e.userName,email:e.email,campaignName:campaign?.campaignName,campaignDetail:campaign?.campaignDetail,count:clients?.length})));
      
    })
    
    //const updateCampaign=await Campaign.findByIdAndUpdate(campaign._id,{isPublished:true})
 
    
  })


process.on("SIGINT", () => {
  redisSubscriber.quit();
  console.log("Redis subscriber closed.");
  process.exit(0);
});
  
}
catch(error:any){
  console.log(error.message)
  // process.on("SIGINT", () => {
  //   subscriber.quit();
  //   console.log("Redis subscriber closed.");
  //   process.exit(0);
  // });
}

// ws.on("open", () => {
  //   console.log("Connected to Server A via WebSocket");
  
  // });
  
  // ws.on("error", (err) => console.error("WebSocket error:", err));  
  
  //   if (ws.readyState === ws.OPEN) {
    //     ws.send(message);
    
    //     // ws.on("message", (message) =>{
      
      //     //   console.log(message.toString("utf-8")); 
      //     //       // console.log("Received response from Server B:", message.toString());
      //     //     });
      
      //     console.log("Sent response back to Server A via WebSocket");
      
      //   }
      //   // const result = await model.generateContent(message?.userPromt );
      //   // console.log(result.response.text());
      // });
      router.listen(3002,()=>{
          console.log("server is running on post 3002")
      })
      
      