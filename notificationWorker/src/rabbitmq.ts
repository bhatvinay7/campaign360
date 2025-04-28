import amqp from 'amqplib'
import dotenv from 'dotenv'
dotenv.config()
let channel:any=null   
let connection:any=null
async function connectToRabbitMQ(){
    
    try{
        if(!connection){
            connection = await amqp.connect(process.env.URL!);
            channel = await connection.createChannel();
            return channel
        }
    return channel
    
}
catch(error:any){
    
}
}
export default connectToRabbitMQ
