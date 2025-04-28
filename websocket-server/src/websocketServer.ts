
import {wss,clients,server} from './socket'
wss.on("connection", (ws: any, request:any) => {
    let subprotocols = request.headers['sec-websocket-protocol'];
    clients.set(subprotocols,ws)
    console.log(subprotocols)
  
  ws.on("message", (message:string) => {
    const data=JSON.parse(message)
    if(data.worker==="llmWorker"){
    const value=data.result.split(" ")
    console.log(value)
    // const data=JSON.parse(value)


      let index=0
      
      function sendChunk(){
        if(index<value.length){
          clients.get("client").send(value[index])
          index++
          setTimeout(()=>sendChunk(),50)
        }
      }
      sendChunk()
    }
    else if(data.worker==="notificationWorker"){
       clients.get("notificationClient").send(data.result.toString())
    }
    //  clients.get("client").send(message.toString("utf-8"))
    // console.log(JSON.stringify(clients.get("client")) + "glkhhh")
    //    console.log(clients.keys())
    //   console.log(message.toString("utf-8")); 
    //   ws.send(message.toString());
  
    });
  
    ws.on("close", () => {
      clients.delete(ws);
      console.log("Server B disconnected");
  
    });
  
  });
  
  
  
 
  server.listen(8080,'0.0.0.0', () => {
    console.log("WebSocket Server A running on ws://localhost:8080");
  });
  
  