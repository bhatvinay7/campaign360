import {model,subscriber} from './socket'
import express from 'express'
import WebSocket from 'ws'
const app=express()
let ws:WebSocket=null as any
async function connectTOWebSocket(){
  const ws = new WebSocket("ws://51.20.63.15:8080","llmWorker");
  ws.on("open",()=>{
    console.log("connected to websocket")
})
ws.on("close",()=>{
  setTimeout(()=>connectTOWebSocket(),1000)
})

ws.on("error",()=>{
  ws.close()
}) 
return ws
}


  



subscriber.subscribe('campain')

subscriber.on("message", async(channel:string,message:string)=> {
  console.log(message)
  
    const result = await model.generateContent(`you will get the promt related to any kind of campain suggestion or idea.If the youser promt is not related campain strictly respond that not aligned with the current policy.otherwise tune the incoming promt and give the brief response 
    userPromt ${JSON.parse(message).promt}`);
  
   if(ws?.readyState !== ws?.OPEN || !ws){
      ws=await connectTOWebSocket()
    }

   if(ws.readyState === ws.OPEN){
         ws.send(JSON.stringify({worker:"llmWorker",result:result.response.text()}));
    }

})
app.listen(3005,()=>{
  console.log("server is running on port 3005")
})