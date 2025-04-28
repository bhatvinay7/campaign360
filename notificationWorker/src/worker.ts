import express from 'express'
import channel from './rabbitmq'
import WebSocket from 'ws'
import {sendEmail} from './mail'
const app=express()
try{
    
    async function connectTOSocket(){
const ws = new WebSocket("ws://51.20.63.15:8080","Notificationworker");

        ws.on("open",()=>{
            console.log("connected to websocket")
        })
       ws.on("close",()=>{
          setTimeout(()=>connectTOSocket(),1000)
       })
   
        ws.on("error",(error:any)=>{
   
       
            ws.close()
        }) 
              return ws
    }
    
    
    async function rabbitMqChannel(){
     let count=0   
     const  rabbitMQchannel=await channel()
     const queue="notificationQueue"
     let ws:WebSocket|null=await  connectTOSocket()
     
     rabbitMQchannel?.consume(queue, async(msg:any) => {
         if(ws?.readyState !== ws?.OPEN){
             ws=await  connectTOSocket()
             
        }
                if (msg?.content !== null) {
                //   console.log( msg?.content.toString());
                const message=JSON.parse( msg?.content.toString())
               
                await sendEmail(message?.email,message?.userName,message?.campaignName,message?.campaignDetail)
                  if (msg){
                    rabbitMQchannel.ack(msg);
                    count++
                  
                    if(ws?.readyState === ws?.OPEN) {
                    if(count===message.count){
                        ws?.send(JSON.stringify({worker:"notificationWorker",result:"all messages are sent"}))
                        count=0
                    }
                }
                  }
                }
            //redispublisher.publish("response","message is recived")
            })
       
      

    }
    rabbitMqChannel()
}


catch(error:any){
    console.log(error.message)

}


app.listen(3003,()=>{
    console.log("notification worker is running on port 3003 ")
})